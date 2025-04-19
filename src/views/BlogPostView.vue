<template>
  <div class="blog-post-container">
    <aside class="left-sidebar">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <h2>Posts</h2>
          <span class="post-count">{{ allPosts.length }} posts</span>
        </div>

        <div class="post-list">
          <div
            v-for="post in paginatedPosts"
            :key="post.id"
            :class="{ active: currentPost?.slug === post.slug }"
            class="post-item"
            @click="navigateToPost(post.slug)"
          >
            <span class="post-title" :data-text="post.title">{{ post.title }}</span>
            <span class="post-date">{{ formatDate(post.date) }}</span>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            class="page-btn"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            ←
          </button>

          <div class="page-numbers">
            <button
              v-for="page in totalPages"
              :key="page"
              :class="['page-number', { active: page === currentPage }]"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </div>

          <button
            class="page-btn"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            →
          </button>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading post...</p>
      </div>
      <div v-else-if="error" class="error-state">
        <h2>Error Loading Post</h2>
        <p>{{ error }}</p>
        <router-link to="/blog" class="nav-link">
          <span class="link-text" data-text="← Back to Blog">← Back to Blog</span>
        </router-link>
      </div>
      <article v-else-if="currentPost" class="blog-post">
        <header class="post-header">
          <h1>{{ currentPost.title }}</h1>
          <div class="post-meta">
            <span class="date">{{ formatDate(currentPost.date) }}</span>
            <span class="category">{{ currentPost.category }}</span>
            <span class="subcategory">{{ currentPost.subCategory }}</span>
          </div>
        </header>

        <div class="post-content" v-html="currentPost.content"></div>
      </article>
    </main>

    <aside class="right-sidebar">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <h2>Article Menu</h2>
        </div>

        <div v-if="currentPost" class="table-of-contents">
          <h3>Contents</h3>
          <ul class="toc-list">
            <li
              v-for="(heading, index) in headings"
              :key="index"
              :class="{ active: activeHeading === heading.id }"
              @click="scrollToHeading(heading.id)"
              class="toc-item"
            >
              <span class="toc-text" :data-text="heading.text">{{ heading.text }}</span>
            </li>
          </ul>
        </div>

        <div v-if="currentPost" class="article-meta-sidebar">
          <h3>Article Info</h3>
          <div class="meta-item">
            <span class="meta-label">Published:</span>
            <span class="meta-value">{{ formatDate(currentPost.date) }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Category:</span>
            <span class="meta-value"
              >{{ currentPost.category }} / {{ currentPost.subCategory }}</span
            >
          </div>
          <div class="meta-item">
            <span class="meta-label">Reading Time:</span>
            <span class="meta-value">{{ readingTime }} min read</span>
          </div>
        </div>

        <div class="navigation-links">
          <router-link to="/blog" class="nav-link">
            <span class="link-text" data-text="← Back to Blog">← Back to Blog</span>
          </router-link>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { loadBlogPost, loadBlogPosts } from '@/utils/contentLoader'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-sql'
// Import a theme (you can choose different themes)
import 'prismjs/themes/prism-tomorrow.css'
import { useHead } from '@vueuse/head'

const router = useRouter()
const route = useRoute()
const activeHeading = ref('')
const headings = ref([])
const allPosts = ref([])
const currentPost = ref(null)
const loading = ref(true)
const error = ref(null)
const postsPerPage = ref(5) // Number of posts to show per page
const currentPage = ref(1)

const extractHeadings = (content) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  return Array.from(doc.querySelectorAll('h2')).map((h2) => ({
    id: h2.id,
    text: h2.textContent.trim(),
  }))
}

onMounted(async () => {
  try {
    loading.value = true
    error.value = null

    const { posts } = await loadBlogPosts()
    allPosts.value = posts
    currentPost.value = await loadBlogPost(route.params.slug)

    if (!currentPost.value) {
      error.value = 'Post not found'
      return
    }

    // Extract headings after markdown processing
    headings.value = extractHeadings(currentPost.value.content)

    // Set up intersection observer for headings
    nextTick(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeHeading.value = entry.target.id
            }
          })
        },
        { rootMargin: '-20% 0px -80% 0px' },
      )

      headings.value.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) observer.observe(element)
      })
    })

    // Highlight code blocks
    nextTick(() => {
      document.querySelectorAll('pre code').forEach((block) => {
        Prism.highlightElement(block)
      })
    })
  } catch (err) {
    console.error('Error loading post:', err)
    error.value = 'Failed to load post. Please try again later.'
  } finally {
    loading.value = false
  }
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const readingTime = computed(() => {
  const words = currentPost.value.content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.ceil(words / 200) // Assuming 200 words per minute reading speed
})

const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const navigateToPost = async (slug) => {
  try {
    loading.value = true
    error.value = null
    currentPost.value = await loadBlogPost(slug)

    if (!currentPost.value) {
      error.value = 'Post not found'
      return
    }

    // Update the URL without triggering a full page reload
    router.push(`/blog/${slug}`, undefined, { shallow: true })

    // Extract headings after markdown processing
    headings.value = extractHeadings(currentPost.value.content)

    // Reset intersection observer
    nextTick(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeHeading.value = entry.target.id
            }
          })
        },
        { rootMargin: '-20% 0px -80% 0px' },
      )

      headings.value.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) observer.observe(element)
      })

      // Re-highlight code blocks
      document.querySelectorAll('pre code').forEach((block) => {
        Prism.highlightElement(block)
      })
    })
  } catch (err) {
    console.error('Error loading post:', err)
    error.value = 'Failed to load post. Please try again later.'
  } finally {
    loading.value = false
  }
}

const structuredData = computed(() => {
  if (!currentPost.value) return ''

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: currentPost.value.title,
    datePublished: currentPost.value.date,
    description: currentPost.value.excerpt || currentPost.value.title,
    image: currentPost.value.image,
    author: {
      '@type': 'Person',
      name: 'Your Name', // Replace with actual author name
    },
  })
})

// Compute meta tags based on current post
const metaTags = computed(() => {
  if (!currentPost.value) return {}

  // Ensure tags is an array or default to empty array
  const tags = Array.isArray(currentPost.value.tags) ? currentPost.value.tags : []

  return {
    title: `${currentPost.value.title} - XCT Blog`,
    meta: [
      {
        name: 'description',
        content: currentPost.value.excerpt || currentPost.value.title,
      },
      {
        property: 'og:title',
        content: currentPost.value.title,
      },
      {
        property: 'og:description',
        content: currentPost.value.excerpt || currentPost.value.title,
      },
      {
        property: 'og:image',
        content: currentPost.value.image,
      },
      {
        name: 'keywords',
        content: tags.join(', '),
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        children: structuredData.value,
      },
    ],
  }
})

// Use the computed meta tags
useHead(metaTags)

// Add this computed property
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value
  const end = start + postsPerPage.value
  return allPosts.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(allPosts.value.length / postsPerPage.value)
})

// Add this method
const changePage = (page) => {
  currentPage.value = page
}
</script>

<style>
pre[class*='language-'] {
  border-radius: 8px;
  margin: 1.5em 0;
  padding: 1em;
  overflow: auto;
  background: #2d2d2d;
}

code[class*='language-'] {
  font-family: 'Fira Code', Monaco, 'Courier New', Courier, monospace;
  font-size: 0.9em;
  line-height: 1.5;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  tab-size: 4;
  hyphens: none;
}

/* Add some nice scrollbar styling */
pre[class*='language-']::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

pre[class*='language-']::-webkit-scrollbar-track {
  background: #1e1e1e;
  border-radius: 4px;
}

pre[class*='language-']::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 4px;
}

pre[class*='language-']::-webkit-scrollbar-thumb:hover {
  background: #888;
}
</style>
<style scoped>
/* Apply glitch styles */
/* .glitch-hover-container .glitch-target::before,
.glitch-hover-container .glitch-target::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-color); 
  overflow: hidden;
  clip-path: inset(50% 0 50% 0);
}

.glitch-hover-container .glitch-target::before {
  color: var(--accent-color);
  animation: glitch 0.3s steps(2, end) 0s infinite alternate-reverse paused;
  text-shadow: -1px 0 var(--primary-color);
}

.glitch-hover-container .glitch-target::after {
  color: var(--secondary-color);
  animation: glitch 0.2s steps(2, end) 0.1s infinite alternate paused;
  text-shadow: 1px 0 var(--accent-color);
}

.glitch-hover-container:hover .glitch-target::before,
.glitch-hover-container:hover .glitch-target::after {
  animation-play-state: running;
}

.glitch-target {
  position: relative;
}

.glitch-button {
  position: relative;
  overflow: hidden;
}

.glitch-button .link-text::before,
.glitch-button .link-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-color); 
  overflow: hidden;
  clip-path: inset(50% 0 50% 0);
}

.glitch-button .link-text::before {
  color: var(--accent-color);
  animation: glitch 0.3s steps(2, end) 0s infinite alternate-reverse paused;
  text-shadow: -1px 0 var(--primary-color);
}

.glitch-button .link-text::after {
  color: var(--secondary-color);
  animation: glitch 0.2s steps(2, end) 0.1s infinite alternate paused;
  text-shadow: 1px 0 var(--accent-color);
}

.glitch-button:hover .link-text::before,
.glitch-button:hover .link-text::after {
  animation-play-state: running;
} */

.blog-post-container {
  display: flex;
  min-height: calc(100vh - var(--nav-height));
  background: var(--bg-color);
  position: relative;
  overflow: hidden;
}

.blog-post-container::before {
  display: none;
}

.left-sidebar,
.right-sidebar {
  width: 250px;
  background: var(--bg-color);
  backdrop-filter: none;
  padding: 2rem;
  position: fixed;
  height: calc(100vh - var(--nav-height));
  overflow-y: auto;
  box-shadow: none;
  border-right-color: var(--subtle-border-color);
  border-left-color: var(--subtle-border-color);
}

.left-sidebar {
  left: 0;
  border-right: var(--subtle-border);
}

.right-sidebar {
  right: 0;
  border-left: var(--subtle-border);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-header h2 {
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: none;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.post-item {
  /* .glitch-hover-container applied via class */
  padding: 0.75rem 1rem;
  border: 1px solid var(--subtle-border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  background: transparent;
}

.post-item:hover {
  border-color: var(--primary-color);
  transform: none;
  background: var(--hover-bg-color);
  /* Glitch handled by container */
}

.post-item.active {
  background: var(--primary-color);
  color: var(--bg-color);
  font-weight: 600;
  border-color: transparent;
}

.post-title {
  /* .glitch-target applied via class */
  display: block;
  color: var(--text-color);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.post-item.active .post-title {
  color: var(--bg-color);
}

.post-date {
  display: block;
  color: var(--text-very-muted-color);
  font-size: 0.8rem;
  font-family: var(--monospace-font);
}

.post-item.active .post-date {
  color: var(--bg-color);
  opacity: 0.7;
}

.main-content {
  flex: 1;
  margin: 0 250px;
  padding: 2rem;
}

.blog-post {
  background: var(--bg-color);
  backdrop-filter: none;
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
  border-left-color: var(--subtle-border-color);
  border-right-color: var(--subtle-border-color);
}

.post-header {
  padding: 2.5rem;
  text-align: center;
  border-bottom: 1px solid var(--subtle-border-color);
}

.post-header h1 {
  font-size: 2.5rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  line-height: 1.3;
  text-shadow: none;
}

.post-meta {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  color: var(--text-very-muted-color);
  font-size: 0.9rem;
  font-family: var(--monospace-font);
}

.post-content {
  padding: 2.5rem;
  line-height: 1.7;
  color: var(--text-color);
}

.post-content :deep(h2) {
  color: var(--primary-color);
  margin: 2.5rem 0 1.5rem;
  font-size: 1.8rem;
  text-shadow: none;
  scroll-margin-top: 100px;
}

.post-content :deep(p) {
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.post-content :deep(li) {
  margin-bottom: 0.75rem;
  color: var(--text-muted-color);
}

.table-of-contents h3,
.article-meta-sidebar h3 {
  color: var(--text-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-shadow: none;
}

.toc-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toc-item {
  /* .glitch-hover-container applied via class */
  position: relative;
  padding: 0.75rem 1rem;
  border: 1px solid var(--subtle-border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  background: transparent;
}

.toc-item:hover {
  border-color: var(--primary-color);
  transform: none;
  background: var(--hover-bg-color);
  /* Glitch handled by container */
}

.toc-item.active {
  background: var(--primary-color);
  color: var(--bg-color);
  font-weight: 600;
  border-color: transparent;
}

.toc-text {
  /* .glitch-target applied via class */
  position: relative;
  z-index: 1;
  color: var(--text-color);
}

.toc-item.active .toc-text {
  color: var(--bg-color);
}

.toc-glow {
  display: none;
}

.article-meta-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--monospace-font);
}

.meta-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid var(--subtle-border-color);
}

.meta-label {
  color: var(--text-muted-color);
}

.meta-value {
  color: var(--text-color);
  font-weight: 500;
  text-align: right;
}

.navigation-links {
  margin-top: auto;
}

.nav-link {
  /* .glitch-button applied via class */
  display: block;
  padding: 0.75rem 1rem;
  color: var(--primary-color);
  text-decoration: none;
  border: 1px solid var(--subtle-border-color);
  border-radius: 8px;
  transition: all var(--transition-speed) ease;
  /* position: relative; - Added by glitch-button */
}

.nav-link:hover {
  border-color: var(--primary-color);
  transform: none;
  background: var(--hover-bg-color);
  color: var(--primary-color);
  /* Glitch handled by glitch-button */
}

.nav-link:hover .link-glow {
  display: none;
}

@media (max-width: 1200px) {
  .left-sidebar,
  .right-sidebar {
    width: 200px;
  }

  .main-content {
    margin: 0 200px;
  }
}

@media (max-width: 768px) {
  .blog-post-container {
    flex-direction: column;
  }

  .left-sidebar,
  .right-sidebar {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-left: none;
    border-bottom: var(--subtle-border);
  }

  .main-content {
    margin: 0;
    padding: 1.5rem;
  }

  .blog-post {
    border-left: none;
    border-right: none;
  }

  .post-header {
    padding: 1.5rem;
  }

  .post-header h1 {
    font-size: 2rem;
  }

  .post-content {
    padding: 1.5rem;
  }

  .post-content :deep(h2) {
    font-size: 1.5rem;
  }

  .pagination {
    margin-bottom: 1rem;
  }

  .page-numbers {
    display: none; /* Hide page numbers on mobile, keep only arrows */
  }
}

/* Add decorative elements to article title */
.article-title::before,
.article-title::after {
  content: '///';
  position: absolute;
  color: var(--secondary-color);
  opacity: 0.4;
}

.article-title::before {
  left: -40px;
}

.article-title::after {
  right: -40px;
}

/* Add decorative elements to TOC items */
.toc-item::before {
  content: '>';
  position: absolute;
  left: -15px;
  color: var(--accent-color);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.toc-item:hover::before {
  opacity: 0.6;
  transform: translateX(5px);
}

/* Add decorative elements to post list items */
.post-list-item::before {
  content: '[';
  position: absolute;
  left: -15px;
  color: var(--secondary-color);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.post-list-item::after {
  content: ']';
  position: absolute;
  right: -15px;
  color: var(--secondary-color);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.post-list-item:hover::before,
.post-list-item:hover::after,
.post-list-item.active::before,
.post-list-item.active::after {
  opacity: 0.6;
}

/* Enhance hover states */
.post-list-item:hover,
.toc-item:hover {
  --glitch-intensity: 2;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* Add decorative elements to section headers */
.section-header::before {
  content: '//';
  position: absolute;
  left: -20px;
  color: var(--secondary-color);
  opacity: 0.4;
}

/* Update existing styles */
.article-title {
  position: relative;
  display: inline-block;
  /* ... existing styles ... */
}

.toc-item {
  position: relative;
  /* ... existing styles ... */
}

.post-list-item {
  position: relative;
  /* ... existing styles ... */
}

.section-header {
  position: relative;
  /* ... existing styles ... */
}

/* ... rest of existing styles ... */

.subcategory {
  font-style: italic;
  color: var(--text-very-muted-color);
  margin-left: 0.5rem;
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--subtle-border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-state h2 {
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.error-state p {
  color: var(--text-muted-color);
  margin-bottom: 1rem;
}

.post-content :deep(pre[class*='language-']) {
  position: relative;
  margin: 2rem 0;
  padding-top: 2.5rem !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.post-content :deep(pre[class*='language-'])::before {
  content: attr(class);
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  font-size: 0.75rem;
  color: #888;
  text-transform: lowercase;
  font-family: var(--monospace-font);
}

.post-content :deep(pre[class*='language-'])::after {
  content: '';
  position: absolute;
  top: 2rem;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.post-content :deep(code[class*='language-']) {
  padding: 0;
  background: transparent;
  text-shadow: none;
}

.post-content :deep(.line-numbers) {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  color: #888;
  padding: 1em 0;
  user-select: none;
}

.post-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  background: var(--bg-color);
}

.post-content :deep(th),
.post-content :deep(td) {
  padding: 0.75rem 1rem;
  border: 1px solid var(--subtle-border-color);
  text-align: left;
}

.post-content :deep(th) {
  background: var(--hover-bg-color);
  font-weight: 600;
  color: var(--text-color);
}

.post-content :deep(tr:nth-child(even)) {
  background: var(--hover-bg-color);
}

.post-content :deep(tr:hover) {
  background: var(--hover-bg-color);
}

.post-content :deep(table caption) {
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-muted-color);
  text-align: left;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-count {
  font-size: 0.8rem;
  color: var(--text-muted-color);
  font-family: var(--monospace-font);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--subtle-border-color);
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-btn,
.page-number {
  background: transparent;
  border: 1px solid var(--subtle-border-color);
  color: var(--text-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  font-family: var(--monospace-font);
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover,
.page-number:hover {
  border-color: var(--primary-color);
  background: var(--hover-bg-color);
  color: var(--primary-color);
}

.page-number.active {
  background: var(--primary-color);
  color: var(--bg-color);
  border-color: var(--primary-color);
}

/* Update existing styles */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 400px; /* Add minimum height to prevent layout shift */
}
</style>
