# PR Preview Deployment Setup

This repository includes a GitHub Actions workflow that automatically creates preview deployments of your static website when pull requests are opened. It uses unique blob containers within a single Azure Storage account.

## Setup Instructions

### 1. Azure Storage Account Setup

Create a storage account that will host all PR preview deployments:

```bash
# Create a resource group (if needed)
az group create --name "rg-static-sites" --location "eastus"

# Create a storage account with public blob access
az storage account create \
  --name "staticpreviewsites" \
  --resource-group "andel-demo" \
  --location "SwedenCentral" \
  --sku Standard_LRS \
  --kind StorageV2 \
  --allow-blob-public-access true

# Get the storage account key
az storage account keys list \
  --account-name "staticpreviewsites" \
  --resource-group "andel-demo" \
  --query "[0].value" \
  --output tsv
```

### 2. GitHub Secrets Configuration

Add this secret to your GitHub repository (Settings → Secrets and variables → Actions):

- `AZURE_STORAGE_ACCOUNT_KEY`: The access key from your Azure Storage account (from step 1)

### 3. Storage Account Configuration

Update the pipeline configuration if needed:
- **Storage Account Name**: Change `STORAGE_ACCOUNT_NAME` in the workflow file to match your storage account
- The default name is `staticpreviewsites` - update this if you used a different name

### 4. How It Works

When a pull request is created or updated:

1. **Creates unique container** - Names it using PR number and commit SHA (e.g., `pr-123-abc7def`)
2. **Uploads static files** - Deploys HTML, CSS, JS, and image files to the container
3. **Sets public access** - Makes the container publicly readable
4. **Posts preview URL** - Comments on the PR with the direct blob URL
5. **Cleans up on close** - Automatically deletes the container when PR is closed

### 5. Customization

You can customize the deployment by modifying `.github/workflows/pr-deploy.yml`:

- **Storage Account**: Change `STORAGE_ACCOUNT_NAME` environment variable to match your account
- **File Types**: Add or remove file patterns in the upload steps
- **Container Naming**: Modify the container naming logic if needed

### 6. Security Features

- Uses **storage account keys** for authentication (simple and secure)
- **Container-level isolation** - each PR gets its own container
- **Automatic cleanup** to prevent storage bloat
- **Public blob access** only for the specific containers

### 7. Cost Considerations

- Uses **single storage account** (no per-PR account costs)
- **Container-based isolation** (minimal overhead)
- **Automatic cleanup** prevents storage accumulation
- **Standard_LRS storage** (cheapest option)

## Troubleshooting

- Ensure your Azure Storage account exists and allows public blob access
- Check that the storage account key is correctly configured in GitHub secrets
- Verify the storage account name matches the one in the workflow
- Container names are automatically generated to be unique per PR

## Example URLs

Preview URLs will follow this pattern:
```
https://staticpreviewsites.blob.core.windows.net/pr-123-abc7def/index.html
```

Where:
- `staticpreviewsites` is your storage account name
- `pr-123-abc7def` is the container name (PR number + commit SHA)
- `index.html` is your main file
