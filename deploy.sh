#!/bin/bash

# Get PR number and commit SHA
PR_NUMBER=$1
SHORT_SHA=$(git rev-parse --short HEAD)

# Create container name and sanitize it
# Remove special characters and ensure it starts with a letter or number
CONTAINER_NAME="pr${PR_NUMBER}${SHORT_SHA}"
# Remove special characters and convert to lowercase
CONTAINER_NAME=$(echo $CONTAINER_NAME | tr '[:upper:]' '[:lower:]' | tr -cd 'a-z0-9')
# Ensure it starts with a letter
if [[ ! $CONTAINER_NAME =~ ^[a-z] ]]; then
  CONTAINER_NAME="p${CONTAINER_NAME}"
fi

# Ensure the container name is lowercase
CONTAINER_NAME=$(echo $CONTAINER_NAME | tr '[:upper:]' '[:lower:]')

echo "name=$CONTAINER_NAME" >> $GITHUB_OUTPUT
echo "Container name: $CONTAINER_NAME"

# Create container and upload files
echo "Creating container: $CONTAINER_NAME"
az storage container create \
  --name $CONTAINER_NAME \
  --account-name $STORAGE_ACCOUNT_NAME \
  --account-key $STORAGE_ACCOUNT_KEY \
  --public-access blob

echo "Uploading files to container"

# Upload all static files
for ext in html css js png jpg svg ico; do
  az storage blob upload-batch \
    --account-name $STORAGE_ACCOUNT_NAME \
    --account-key $STORAGE_ACCOUNT_KEY \
    --destination $CONTAINER_NAME \
    --source . \
    --pattern "*.$ext" \
    --overwrite true || true
done

# Construct and output the website URL
WEBSITE_URL="https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME}/index.html"
echo "website-url=$WEBSITE_URL" >> $GITHUB_OUTPUT
echo "container-name=$CONTAINER_NAME" >> $GITHUB_OUTPUT
echo "Website URL: $WEBSITE_URL"