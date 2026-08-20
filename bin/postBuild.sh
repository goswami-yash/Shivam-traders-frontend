#!/bin/bash
set -e

buildId=$1
serviceName=$2
branch=$3

# ---------- Branch / Tag Setup ----------
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

# ---------- Verify build.sh Completion Marker ----------
markerFile="/tmp/docker_build_complete_${buildId}.marker"

echo "=========================================="
echo "Validating build.sh completion..."
echo "=========================================="

if [ ! -f "$markerFile" ]; then
    echo "ERROR: Build completion marker missing ($markerFile)"
    exit 1
fi

expectedTag=$(head -n 1 "$markerFile")
if [ "$expectedTag" != "$tagName" ]; then
    echo "ERROR: Tag mismatch in marker. Expected: $tagName, Found: $expectedTag"
    exit 1
fi

buildTimestamp=$(tail -n 1 "$markerFile")
currentTimestamp=$(date -u +%s)
timeDiff=$((currentTimestamp - buildTimestamp))

echo "✓ Marker verified (age: ${timeDiff}s)"

# ---------- Validate Docker Image ----------
echo "=========================================="
echo "Validating Docker Image: $tagName"
echo "=========================================="

if ! docker image inspect "$tagName" >/dev/null 2>&1; then
    echo "ERROR: Local Docker image '$tagName' not found"
    exit 1
fi

imageId=$(docker image inspect "$tagName" --format '{{.Id}}' | cut -d: -f2 | cut -c1-12)
imageSize=$(docker image inspect "$tagName" --format '{{.Size}}' | awk '{printf "%.2f MB", $1/1024/1024}')
created=$(docker image inspect "$tagName" --format '{{.Created}}')

echo "  Image ID: $imageId"
echo "  Size    : $imageSize"
echo "  Created : $created"

echo "Checking Nginx directory inside container (/usr/share/nginx/html)..."
if ! docker run --rm --entrypoint="" "$tagName" test -d /usr/share/nginx/html; then
    echo "ERROR: /usr/share/nginx/html directory not found in image"
    exit 1
fi

echo "Validating Vite index.html inside container..."
if ! docker run --rm --entrypoint="" "$tagName" test -f /usr/share/nginx/html/index.html; then
    echo "ERROR: /usr/share/nginx/html/index.html not found in image"
    exit 1
fi

fileCount=$(docker run --rm --entrypoint="" "$tagName" find /usr/share/nginx/html -type f | wc -l)
echo "  Files in image: $fileCount"

echo "Validating Nginx configuration syntax..."
if ! docker run --rm --entrypoint="" "$tagName" nginx -t >/dev/null 2>&1; then
    echo "ERROR: Nginx configuration check failed"
    exit 1
fi

echo "✓ Docker image validation passed"

# ---------- Push to ECR ----------
echo "=========================================="
echo "Pushing Docker Image → ECR"
echo "=========================================="

if [ -f "/tmp/build_tag.out" ]; then
    ecrTargetTag=$(cat /tmp/build_tag.out)_${env}
    echo "Tagging local image $tagName as $ecrTargetTag"
    docker tag "$tagName" "$ecrTargetTag"
else
    ecrTargetTag="$tagName"
fi

if docker push "$ecrTargetTag"; then
    echo "Successfully pushed image to ECR ($ecrTargetTag)"
else
    echo "ERROR: Failed to push image to ECR ($ecrTargetTag)"
    exit 1
fi