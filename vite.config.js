import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Base path for GitHub Pages - change to your repository name
  // If deploying to a custom domain, you can set this to '/'
  base: '/', // or '/' if using custom domain

  // Build configuration
  build: {
    // Improve chunk loading strategy
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          markdown: ['marked', 'gray-matter'],
        },
      },
    },
    // Generate .nojekyll file to prevent GitHub Pages from using Jekyll
    emptyOutDir: true,
  },

  // Handle static asset imports
  assetsInclude: ['**/*.md'],

  // Development server settings
  server: {
    open: true,
    host: '0.0.0.0',
  },
})
