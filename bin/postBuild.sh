#!/bin/bash

set -Eeuo pipefail

IMAGE_TAG="$1"
SERVICE_NAME="$2"

AWS_REGION="${AWS_DEFAULT_REGION:-ap-south-1}"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:?AWS_ACCOUNT_ID is not set}"

ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

LOCAL_IMAGE="${SERVICE_NAME}:${IMAGE_TAG}"
ECR_IMAGE="${ECR_REGISTRY}/${SERVICE_NAME}:${IMAGE_TAG}"

echo "=========================================="
echo "POST BUILD"
echo "=========================================="

echo "Service       : $SERVICE_NAME"
echo "Image Tag     : $IMAGE_TAG"
echo "Local Image   : $LOCAL_IMAGE"
echo "ECR Image     : $ECR_IMAGE"
echo "AWS Region    : $AWS_REGION"
echo "=========================================="

###########################################
# Error handling
###########################################

trap '
    echo ""
    echo "=========================================="
    echo "ERROR: postBuild.sh failed"
    echo "Line    : $LINENO"
    echo "Command : $BASH_COMMAND"
    echo "=========================================="
' ERR

###########################################
# Validate production tag
###########################################

case "$IMAGE_TAG" in
    *_prod)
        echo "✓ Production tag confirmed: $IMAGE_TAG"
        ;;
    *)
        echo "ERROR: Production tag required."
        echo "Received: $IMAGE_TAG"
        echo "Expected example: 1_prod"
        exit 1
        ;;
esac

###########################################
# Validate completion marker
###########################################

MARKER_FILE="/tmp/docker_build_complete_${IMAGE_TAG}.marker"

echo "=========================================="
echo "CHECKING BUILD MARKER"
echo "=========================================="

if [ ! -f "$MARKER_FILE" ]; then
    echo "ERROR: Build completion marker not found:"
    echo "$MARKER_FILE"
    exit 1
fi

EXPECTED_TAG=$(head -n 1 "$MARKER_FILE")

if [ "$EXPECTED_TAG" != "$IMAGE_TAG" ]; then
    echo "ERROR: Build tag mismatch"
    echo "Expected: $IMAGE_TAG"
    echo "Found   : $EXPECTED_TAG"
    exit 1
fi

echo "✓ Build marker verified"

###########################################
# Validate Docker image
###########################################

echo "=========================================="
echo "VALIDATING DOCKER IMAGE"
echo "=========================================="

if ! docker image inspect "$LOCAL_IMAGE" >/dev/null 2>&1; then
    echo "ERROR: Docker image not found:"
    echo "$LOCAL_IMAGE"

    echo ""
    echo "Available Docker images:"
    docker images

    exit 1
fi

IMAGE_ID=$(docker image inspect "$LOCAL_IMAGE" \
    --format '{{.Id}}' |
    cut -d: -f2 |
    cut -c1-12)

IMAGE_SIZE=$(docker image inspect "$LOCAL_IMAGE" \
    --format '{{.Size}}' |
    awk '{printf "%.2f MB", $1/1024/1024}')

CREATED=$(docker image inspect "$LOCAL_IMAGE" \
    --format '{{.Created}}')

echo "Image ID : $IMAGE_ID"
echo "Size     : $IMAGE_SIZE"
echo "Created  : $CREATED"

###########################################
# Validate nginx directory
###########################################

echo "=========================================="
echo "VALIDATING NGINX HTML"
echo "=========================================="

if ! docker run --rm \
    --entrypoint="" \
    "$LOCAL_IMAGE" \
    test -d /usr/share/nginx/html; then

    echo "ERROR: /usr/share/nginx/html not found"
    exit 1
fi

echo "✓ Nginx HTML directory exists"

###########################################
# Validate index.html
###########################################

if ! docker run --rm \
    --entrypoint="" \
    "$LOCAL_IMAGE" \
    test -f /usr/share/nginx/html/index.html; then

    echo "ERROR: index.html not found"
    exit 1
fi

echo "✓ index.html exists"

###########################################
# Count frontend files
###########################################

FILE_COUNT=$(docker run --rm \
    --entrypoint="" \
    "$LOCAL_IMAGE" \
    find /usr/share/nginx/html -type f | wc -l)

echo "Frontend files: $FILE_COUNT"

###########################################
# Validate nginx configuration
###########################################

echo "=========================================="
echo "VALIDATING NGINX CONFIGURATION"
echo "=========================================="

docker run --rm \
    --entrypoint="" \
    "$LOCAL_IMAGE" \
    nginx -t

echo "✓ Nginx configuration valid"

###########################################
# ECR Login
###########################################

echo "=========================================="
echo "ECR LOGIN"
echo "=========================================="

aws ecr get-login-password \
    --region "$AWS_REGION" |
docker login \
    --username AWS \
    --password-stdin "$ECR_REGISTRY"

echo "✓ ECR login successful"

###########################################
# Create ECR tag
###########################################

echo "=========================================="
echo "TAGGING IMAGE FOR ECR"
echo "=========================================="

echo "FROM:"
echo "$LOCAL_IMAGE"

echo ""

echo "TO:"
echo "$ECR_IMAGE"

docker tag "$LOCAL_IMAGE" "$ECR_IMAGE"

echo "✓ ECR tag created"

###########################################
# Verify ECR tag
###########################################

if ! docker image inspect "$ECR_IMAGE" >/dev/null 2>&1; then
    echo "ERROR: ECR image tag was not created"
    exit 1
fi

echo "✓ ECR image verified"

###########################################
# Push image
###########################################

echo "=========================================="
echo "PUSHING IMAGE TO ECR"
echo "=========================================="

docker push "$ECR_IMAGE"

###########################################
# Success
###########################################

echo "=========================================="
echo "✓ PRODUCTION DEPLOYMENT IMAGE READY"
echo "=========================================="

echo "Environment : production"
echo "Tag         : $IMAGE_TAG"
echo "Image       : $ECR_IMAGE"

echo "=========================================="