---
title: Deploying Vue 3 to GitHub Pages
date: 2025-04-19
category: technology
subCategory: web development
image: /images/vue3-github.jpg
excerpt: A step-by-step guide to deploying your Vue 3 application to GitHub Pages.
tags: [vue3, github-pages, web-development]
author: XCT Team
---

This guide walks you through deploying a Vue 3 application to GitHub Pages using GitHub Actions. By following these steps, you can set up an automated deployment pipeline where users only need to commit and push their code to GitHub, and the application will be built and deployed automatically.

## Prerequisites

- A Vue 3 project initialized with Vite.
- A GitHub repository for your project.
- Basic familiarity with Git and GitHub.

## Step 1: Configure Your Vite Project

To deploy your Vue 3 application to GitHub Pages, you need to configure your Vite build settings. Below is a sample `vite.config.js` configuration tailored for GitHub Pages deployment.

### Sample `vite.config.js`

Create or update the `vite.config.js` file in the root of your project with the following content:

```javascript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Base path for GitHub Pages - change to your repository name
  base: '/<your-repo-name>/', // e.g., '/my-vue-app/' or '/' if using a custom domain
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
    outDir: 'docs', // Output directory for GitHub Pages
    emptyOutDir: true,
  },
  server: {
    open: true,
    host: '0.0.0.0',
  },
})
```

**Key Configurations**:

- **`base`**: Set this to `/<your-repo-name>/` to match your GitHub repository name (e.g., `/my-vue-app/`). If you're using a custom domain, set it to `'/'`.
- **`outDir`**: Set to `'docs'` because GitHub Pages typically serves content from the `docs` folder or the root of the repository.
- **`emptyOutDir`**: Ensures the `docs` folder is cleared before each build.

## Step 2: Set Up GitHub Actions Workflow

GitHub Actions automates the build and deployment process. Create a workflow file to define the steps for building and deploying your Vue 3 application.

### Sample `deploy.yml`

Create a file named `.github/workflows/deploy.yml` in your repository with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Add .nojekyll file
        run: touch ./docs/.nojekyll

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./docs

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Key Workflow Details**:

- **Trigger**: The workflow runs on pushes to the `main` branch or when manually triggered (`workflow_dispatch`).
- **Permissions**: Grants necessary permissions for reading content and writing to GitHub Pages.
- **Build Job**:
  - Checks out the code.
  - Sets up Node.js (version 18).
  - Installs dependencies and runs the build command (`npm run build`).
  - Creates a `.nojekyll` file to prevent GitHub Pages from processing the site with Jekyll.
  - Uploads the `docs` folder as an artifact.
- **Deploy Job**:
  - Deploys the uploaded artifact to GitHub Pages and outputs the deployed URL.

## Step 3: Configure GitHub Pages in Repository Settings

To enable GitHub Pages and link it to the GitHub Actions workflow, follow these steps:

1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages** (or directly to `https://github.com/<your-username>/<your-repo-name>/settings/pages`).
3. In the **Build and deployment** section:
   - Set the **Source** to **GitHub Actions**.
4. Save the changes.

![github actions](/images/vue3githubpage/Screenshot_1.png)

This configuration tells GitHub Pages to use the output from your GitHub Actions workflow for deployment.

## Step 5: Commit and Push Your Changes

Once the configuration files are in place, commit and push your changes to the `main` branch:

```bash
git add .
git commit -m "Set up GitHub Actions for GitHub Pages deployment"
git push origin main
```

## Step 4: Verify the Deployment

After the workflow completes:

1. Go to the **Actions** tab in your GitHub repository to check the workflow status.
2. Once the deployment is successful, visit your GitHub Pages URL: `https://<your-username>.github.io/<your-repo-name>/`.
   - If you used a custom domain, visit that domain instead.

The GitHub Actions workflow will automatically trigger, build your Vue 3 application, and deploy it to GitHub Pages.

![github actions](/images/vue3githubpage/Screenshot_2.png)

## Troubleshooting

- **404 Error on Page Load**: Ensure the `base` path in `vite.config.js` matches your repository name (e.g., `/my-vue-app/`). If using a custom domain, set `base` to `'/'`.
- **Workflow Fails**: Check the workflow logs in the **Actions** tab for errors. Common issues include missing dependencies or incorrect Node.js versions.
- **Assets Not Loading**: Verify that the `assetsInclude` in `vite.config.js` includes all necessary file types.

## Conclusion

By setting up a GitHub Actions workflow and configuring your Vite project, you can deploy a Vue 3 application to GitHub Pages with minimal effort. Users only need to commit and push their code, and the automated pipeline handles the rest. This setup is ideal for static sites, portfolios, or documentation pages built with Vue 3.

For further customization, refer to the [Vite documentation](https://vitejs.dev/) and [GitHub Actions documentation](https://docs.github.com/en/actions).
