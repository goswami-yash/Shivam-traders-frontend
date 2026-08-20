#!/bin/sh
set -e


buildId=$1
serviceName=$2
branch=$3

###########################################
# Cleanup on exit
###########################################
cleanup() {
    echo ""
    echo "=========================================="
    echo "Build interrupted. Cleaning up..."
    echo "=========================================="

    container_ids=$(docker ps -q --filter "ancestor=node:24.2.0-alpine3.21" 2>/dev/null || true)
    if [ -n "$container_ids" ]; then
        echo "$container_ids" | while read -r cid; do
            docker kill "$cid" 2>/dev/null || true
        done
    fi
    exit 130
}

trap cleanup INT TERM


###########################################
# Branch → Tag → Environment
###########################################
echo "current branch -> $branch"
echo "phase1 running"

case "$branch" in
    */main|*/master|main|master)
        tagName="${buildId}_prod"
        env="production"
        ;;
    *)
        tagName="${buildId}_staging"
        env="staging"
        ;;
esac

echo "phase 2 running"
printf "Generated Tag Name: %s\n" "$tagName"


###########################################
# Build using isolated Node 24 container
###########################################
echo "Running clean Vite build in Node 24..."

docker run --rm --init \
  -u root \
  -v $(pwd):/app \
  -w /app \
  node:24.2.0-alpine3.21 \
  sh -c "
    echo '✓ Using Node version:' && node -v && \
    echo 'Installing dependencies...' && \
    npm ci && \
    echo 'Building Vite project...' && \
    NODE_ENV=production npm run build
  "

buildExitCode=$?

if [ $buildExitCode -ne 0 ]; then
    echo "=========================================="
    echo "ERROR: Vite build failed (exit $buildExitCode)"
    echo "=========================================="
    exit $buildExitCode
fi


###########################################
# Validate dist folder
###########################################
echo "phase 3 running"

if [ -d "./dist" ] && [ -f "./dist/index.html" ]; then
    buildSize=$(du -sh ./dist | cut -f1)
    fileCount=$(find ./dist -type f | wc -l)

    echo "=========================================="
    echo "Build Directory Verification:"
    echo "  Directory: ./dist"
    echo "  Total Size: $buildSize"
    echo "  Total Files: $fileCount"
    echo "  index.html: present"
    echo "=========================================="
else
    echo "ERROR: ./dist folder or ./dist/index.html missing after build"
    exit 1
fi


###########################################
# Build Docker Image
###########################################
echo "phase 4 running"

docker build -f ./Dockerfile-pro --tag "$tagName" .

dockerBuildExitCode=$?

if [ $dockerBuildExitCode -ne 0 ]; then
    echo "=========================================="
    echo "ERROR: Docker image build failed (exit $dockerBuildExitCode)"
    echo "=========================================="
    exit $dockerBuildExitCode
fi


###########################################
# Completion Marker
###########################################
echo "$tagName" > /tmp/docker_build_complete_${buildId}.marker
echo "$(date -u +%s)" >> /tmp/docker_build_complete_${buildId}.marker

echo "Build process finished successfully."