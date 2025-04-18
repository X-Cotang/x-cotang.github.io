# XCT Blog

A modern, scientific blog built with Vue 3 for GitHub Pages deployment.

## Directory Structure

```
project-root/
│
├── public/               # Static assets served as-is
│   └── images/           # Blog post images
│
├── src/
│   ├── content/          # Blog content directory
│   │   └── blog/         # All blog posts
│   │       ├── category1/
│   │       │   ├── subcategory1/
│   │       │   │   └── article-slug.md  # Individual markdown files
│   │       │   └── subcategory2/
│   │       └── category2/
│   │
│   ├── components/       # Vue components
│   ├── views/            # Vue view components
│   ├── utils/            # Utility functions
│   │   └── contentLoader.js  # Loads and processes markdown content
│   └── ...
│
└── ...
```

## Blog Post Format

Blog posts are written in Markdown with frontmatter for metadata. Place your posts in the appropriate category and subcategory folder.

### Example Markdown File

```markdown
---
title: Understanding Web Security Fundamentals
date: 2024-04-18
category: hacking
subCategory: Web Security
image: /images/web-security.jpg
excerpt: An in-depth look at common web vulnerabilities and defenses.
tags: [security, web, vulnerabilities]
---

# Understanding Web Security Fundamentals

## Introduction

Your content here...

## Section Title

More content...
```

### Required Frontmatter Fields

| Field         | Description                           |
| ------------- | ------------------------------------- |
| `title`       | The title of your blog post           |
| `date`        | Publication date (YYYY-MM-DD format)  |
| `category`    | Main category of the post             |
| `subCategory` | Subcategory of the post               |
| `excerpt`     | Brief summary displayed in post lists |

### Optional Frontmatter Fields

| Field    | Description                                         |
| -------- | --------------------------------------------------- |
| `image`  | Path to featured image (placed in `public/images/`) |
| `tags`   | Array of related tags                               |
| `author` | Author name                                         |
| `draft`  | Set to `true` to exclude from production build      |

## Adding a New Blog Post

1. Determine the appropriate category and subcategory for your post
2. Create a new markdown file in `src/content/blog/[category]/[subcategory]/`
3. Name the file with a descriptive slug (e.g., `understanding-web-security.md`)
4. Add the required frontmatter fields at the top of the file
5. Write your content using Markdown
6. If you're using images, add them to `public/images/`
7. Commit and push your changes to GitHub

## GitHub Pages Deployment

This project is configured for GitHub Pages deployment. When you push changes to the `main` branch, GitHub Actions will automatically build and deploy your site.

### Manual Deployment

To manually deploy:

```bash
npm run build
```

This will generate static files in the `dist/` directory, which can be deployed to any static hosting service.

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```
