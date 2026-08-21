#!/bin/bash
set -e

buildId=$1
serviceName=$2
branch=$3

# =========================================================
# AWS / ECR Configuration
# =========================================================

AWS_REGION="${AWS_DEFAULT_REGION:-ap-south-1}"
AWS_ACCOUNT_ID="${AWS_ACCOUNT_ID:?AWS_ACCOUNT_ID is not set}"

ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

# =========================================================
# Branch / Environment / Tag Setup
# =========================================================

case "$branch" in
    */main|*/master|main|master|production|prod)
        tagName="${buildId}_prod"
        env="production"
        ;;

    *)
        tagName="${buildId}_staging"
        env="staging"
        ;;
esac

echo "=========================================="
echo "DEPLOYMENT INFORMATION"
echo "=========================================="
echo "Build ID     : $buildId"
echo "Service      : $serviceName"
echo "Branch/Env   : $branch"
echo "Environment  : $env"
echo "Docker Tag   : $tagName"
echo "ECR Registry : $ECR_REGISTRY"
echo "=========================================="

# =========================================================
# Verify build.sh Completion Marker
# =========================================================

markerFile="/tmp/docker_build_complete_${buildId}.marker"

echo "=========================================="
echo "Validating build.sh completion..."
echo "=========================================="

if [ ! -f "$markerFile" ]; then
    echo "ERROR: Build completion marker missing:"
    echo "$markerFile"
    exit 1
fi

expectedTag=$(head -n 1 "$markerFile")

echo "Expected Tag : $tagName"
echo "Marker Tag   : $expectedTag"

if [ "$expectedTag" != "$tagName" ]; then
    echo "ERROR: Tag mismatch in marker."
    echo "Expected: $tagName"
    echo "Found   : $expectedTag"
    exit 1
fi

buildTimestamp=$(tail -n 1 "$markerFile")
currentTimestamp=$(date -u +%s)
timeDiff=$((currentTimestamp - buildTimestamp))

echo "✓ Marker verified (age: ${timeDiff}s)"

# =========================================================
# Validate Docker Image
# =========================================================

echo "=========================================="
echo "Validating Docker Image"
echo "=========================================="

echo "Expected local image:"
echo "${serviceName}:${tagName}"

if ! docker image inspect "${serviceName}:${tagName}" >/dev/null 2>&1; then
    echo "ERROR: Local Docker image not found:"
    echo "${serviceName}:${tagName}"

    echo ""
    echo "Available Docker images:"
    docker images

    exit 1
fi

imageId=$(docker image inspect "${serviceName}:${tagName}" \
    --format '{{.Id}}' |
    cut -d: -f2 |
    cut -c1-12)

imageSize=$(docker image inspect "${serviceName}:${tagName}" \
    --format '{{.Size}}' |
    awk '{printf "%.2f MB", $1/1024/1024}')

created=$(docker image inspect "${serviceName}:${tagName}" \
    --format '{{.Created}}')

echo "Image ID : $imageId"
echo "Size     : $imageSize"
echo "Created  : $created"

# =========================================================
# Validate Nginx
# =========================================================

echo "=========================================="
echo "Validating Nginx"
echo "=========================================="

echo "Checking /usr/share/nginx/html..."

if ! docker run --rm \
    --entrypoint="" \
    "${serviceName}:${tagName}" \
    test -d /usr/share/nginx/html; then

    echo "ERROR: /usr/share/nginx/html directory not found"
    exit 1
fi

echo "Checking index.html..."

if ! docker run --rm \
    --entrypoint="" \
    "${serviceName}:${tagName}" \
    test -f /usr/share/nginx/html/index.html; then

    echo "ERROR: index.html not found"
    exit 1
fi

fileCount=$(docker run --rm \
    --entrypoint="" \
    "${serviceName}:${tagName}" \
    find /usr/share/nginx/html -type f | wc -l)

echo "Files in image: $fileCount"

echo "Checking Nginx configuration..."

if ! docker run --rm \
    --entrypoint="" \
    "${serviceName}:${tagName}" \
    nginx -t >/dev/null 2>&1; then

    echo "ERROR: Nginx configuration check failed"
    exit 1
fi

echo "✓ Docker image validation passed"

# =========================================================
# ECR Login
# =========================================================

echo "=========================================="
echo "Logging in to ECR"
echo "=========================================="

aws ecr get-login-password \
    --region "$AWS_REGION" |
docker login \
    --username AWS \
    --password-stdin "$ECR_REGISTRY"

echo "✓ ECR login successful"

# =========================================================
# Create ECR Image Tag
# =========================================================

ecrTargetTag="${ECR_REGISTRY}/${serviceName}:${tagName}"

echo "=========================================="
echo "Creating ECR Image Tag"
echo "=========================================="

echo "Local Image:"
echo "${serviceName}:${tagName}"

echo ""

echo "ECR Image:"
echo "$ecrTargetTag"

docker tag \
    "${serviceName}:${tagName}" \
    "$ecrTargetTag"

echo "✓ ECR tag created"

# =========================================================
# Push to ECR
# =========================================================

echo "=========================================="
echo "Pushing Docker Image → ECR"
echo "=========================================="

docker push "$ecrTargetTag"

echo "=========================================="
echo "✓ ECR PUSH SUCCESS"
echo "=========================================="
echo "Environment : $env"
echo "Tag         : $tagName"
echo "Image       : $ecrTargetTag"
echo "=========================================="