#!/bin/sh

set -eu

IMAGE_TAG="$1"
SERVICE_NAME="$2"

echo "=========================================="
echo "BUILD SCRIPT"
echo "=========================================="

echo "Image Tag   : $IMAGE_TAG"
echo "Service     : $SERVICE_NAME"

###########################################
# Validate arguments
###########################################

if [ -z "$IMAGE_TAG" ]; then
    echo "ERROR: IMAGE_TAG is empty"
    exit 1
fi

if [ -z "$SERVICE_NAME" ]; then
    echo "ERROR: SERVICE_NAME is empty"
    exit 1
fi

###########################################
# Validate production tag
###########################################

case "$IMAGE_TAG" in
    *_prod)
        echo "✓ Production tag detected: $IMAGE_TAG"
        ;;
    *)
        echo "ERROR: Invalid production tag: $IMAGE_TAG"
        echo "Expected format: 1_prod"
        exit 1
        ;;
esac

###########################################
# Cleanup
###########################################

cleanup() {
    echo ""
    echo "=========================================="
    echo "Build interrupted. Cleaning up..."
    echo "=========================================="

    container_ids=$(docker ps -q \
        --filter "ancestor=node:24.2.0-alpine3.21" \
        2>/dev/null || true)

    if [ -n "$container_ids" ]; then
        echo "$container_ids" | while read -r cid; do
            docker kill "$cid" 2>/dev/null || true
        done
    fi

    exit 130
}

trap cleanup INT TERM

###########################################
# Build frontend
###########################################

echo "=========================================="
echo "BUILDING VITE APPLICATION"
echo "=========================================="

echo "Using Node 24..."

docker run --rm --init \
    -u root \
    -v "$(pwd):/app" \
    -w /app \
    node:24.2.0-alpine3.21 \
    sh -c '
        set -e

        echo "Node version:"
        node -v

        echo "NPM version:"
        npm -v

        echo "Installing dependencies..."
        npm ci

        echo "Building Vite application..."
        NODE_ENV=production npm run build
    '

###########################################
# Validate dist
###########################################

echo "=========================================="
echo "VALIDATING VITE BUILD"
echo "=========================================="

if [ ! -d "./dist" ]; then
    echo "ERROR: ./dist directory does not exist"
    exit 1
fi

if [ ! -f "./dist/index.html" ]; then
    echo "ERROR: ./dist/index.html does not exist"
    exit 1
fi

buildSize=$(du -sh ./dist | cut -f1)
fileCount=$(find ./dist -type f | wc -l)

echo "Directory  : ./dist"
echo "Size       : $buildSize"
echo "Files      : $fileCount"
echo "index.html : present"

###########################################
# Build Docker image
###########################################

echo "=========================================="
echo "BUILDING DOCKER IMAGE"
echo "=========================================="

LOCAL_IMAGE="${SERVICE_NAME}:${IMAGE_TAG}"

echo "Docker image:"
echo "$LOCAL_IMAGE"

docker build \
    -f ./Dockerfile-pro \
    -t "$LOCAL_IMAGE" \
    .

###########################################
# Validate Docker image
###########################################

echo "=========================================="
echo "VALIDATING DOCKER IMAGE"
echo "=========================================="

if ! docker image inspect "$LOCAL_IMAGE" >/dev/null 2>&1; then
    echo "ERROR: Docker image was not created:"
    echo "$LOCAL_IMAGE"
    exit 1
fi

echo "✓ Docker image created successfully"

docker image inspect "$LOCAL_IMAGE" \
    --format 'Image ID: {{.Id}}'

docker image inspect "$LOCAL_IMAGE" \
    --format 'Created: {{.Created}}'

###########################################
# Completion marker
###########################################

MARKER_FILE="/tmp/docker_build_complete_${IMAGE_TAG}.marker"

echo "$IMAGE_TAG" > "$MARKER_FILE"
date -u +%s >> "$MARKER_FILE"

echo "Marker created:"
echo "$MARKER_FILE"

###########################################
# Build complete
###########################################

echo "=========================================="
echo "✓ BUILD SUCCESSFUL"
echo "=========================================="

echo "Local Docker image:"
echo "$LOCAL_IMAGE"

echo "Production tag:"
echo "$IMAGE_TAG"

echo "=========================================="