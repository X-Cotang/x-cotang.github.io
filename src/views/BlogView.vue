<template>
  <div class="blog-container">
    <aside class="sidebar">
      <div class="sidebar-content">
        <div class="sidebar-header">
          <h2>Quick Access</h2>
          <div class="search-box">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search posts..."
              class="search-input"
            />
          </div>
        </div>

        <div class="category-list">
          <div v-for="category in categories" :key="category.id" class="category-item-wrapper">
            <button
              :class="{ active: selectedCategory === category.id }"
              @click="selectCategory(category.id)"
              class="category-button"
            >
              <span class="button-text" :data-text="category.name">{{ category.name }}</span>
              <span class="button-glow"></span>
            </button>

            <div
              class="subcategory-list"
              v-if="category.id !== 'all' && category.subCategories.length > 0"
              :class="{ visible: selectedCategory === category.id }"
            >
              <button
                v-for="subCategory in category.subCategories"
                :key="subCategory"
                :class="{ active: selectedSubCategory === subCategory }"
                @click="selectSubCategory(subCategory)"
                class="subcategory-button"
              >
                <span class="button-text" :data-text="subCategory">{{ subCategory }}</span>
                <span class="button-glow"></span>
              </button>
            </div>
          </div>
        </div>

        <div class="recent-posts">
          <h3>Recent Posts</h3>
          <ul class="post-list">
            <li
              v-for="post in recentPosts"
              :key="post.id"
              @click="navigateToPost(post.slug)"
              class="post-item"
            >
              <span class="post-title" :data-text="post.title">{{ post.title }}</span>
              <span class="post-date">{{ formatDate(post.date) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <main class="main-content">
      <header class="blog-header">
        <h1>Scientific Blog</h1>
        <p class="subtitle">Exploring Technology, Finance, and Beyond</p>
      </header>

      <div class="posts-list">
        <article
          v-for="article in paginatedPosts"
          :key="article.id"
          class="post-card"
          @click="navigateToPost(article.slug)"
        >
          <div class="post-content">
            <div class="post-header">
              <h2 class="" :data-text="article.title">{{ article.title }}</h2>
              <div class="post-meta">
                <span class="date">{{ formatDate(article.date) }}</span>
                <span class="category">{{ article.category }}</span>
                <span class="subcategory">{{ article.subCategory }}</span>
              </div>
            </div>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <div class="post-footer">
              <span class="read-more">
                <span class="link-text">Read More</span>
                <span class="link-arrow">→</span>
              </span>
            </div>
          </div>
        </article>

        <div v-if="totalPages > 1" class="pagination">
          <div class="pagination-info">
            Showing {{ (currentPage - 1) * postsPerPage + 1 }} -
            {{ Math.min(currentPage * postsPerPage, filteredArticles.length) }}
            of {{ filteredArticles.length }} posts
          </div>

          <div class="pagination-controls">
            <button
              class="page-btn"
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              <span class="btn-text">Previous</span>
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
              <span class="btn-text">Next</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { loadBlogPosts, getRecentPosts } from '@/utils/contentLoader'

const router = useRouter()
const searchQuery = ref('')
const articles = ref([])
const categories = ref([])
const recentPosts = ref([])

const selectedCategory = ref('all')
const selectedSubCategory = ref('')

const postsPerPage = ref(6)
const currentPage = ref(1)

onMounted(async () => {
  const { posts, categories: loadedCategories } = await loadBlogPosts()
  articles.value = posts
  categories.value = loadedCategories
  recentPosts.value = await getRecentPosts(5)
})

watch(selectedCategory, () => {
  selectedSubCategory.value = ''
})

const filteredArticles = computed(() => {
  let filtered = articles.value
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter((article) => article.category === selectedCategory.value)
  }
  if (selectedSubCategory.value) {
    filtered = filtered.filter((article) => article.subCategory === selectedSubCategory.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        (article.subCategory && article.subCategory.toLowerCase().includes(query)),
    )
  }
  return filtered
})

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage.value
  const end = start + postsPerPage.value
  return filteredArticles.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / postsPerPage.value)
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const navigateToPost = (slug) => {
  router.push(`/blog/${slug}`)
}

const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

const selectSubCategory = (subCategoryName) => {
  selectedSubCategory.value = subCategoryName
}

const changePage = (page) => {
  currentPage.value = page
  document.querySelector('.posts-list')?.scrollIntoView({ behavior: 'smooth' })
}

watch([searchQuery, selectedCategory, selectedSubCategory], () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* Remove glitch animation styles */
/* .glitch-button {
  position: relative;
  overflow: hidden; 
}

.glitch-button .button-text::before,
.glitch-button .button-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-color);
  overflow: hidden;
}

.glitch-button .button-text::before {
  left: calc(-2px * var(--glitch-intensity));
  text-shadow: 2px 0 #ff000088;
  animation: glitch 0.4s ease-in-out infinite alternate-reverse;
}

.glitch-button .button-text::after {
  left: calc(2px * var(--glitch-intensity));
  text-shadow: -2px 0 #0000ff88;
  animation: glitch 0.3s ease-in-out infinite alternate-reverse;
} */

/* Add decorative elements to post items */
.post-item::before {
  content: '///';
  position: absolute;
  left: -20px;
  color: var(--secondary-color);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.post-item::after {
  content: '>';
  position: absolute;
  right: 10px;
  color: var(--accent-color);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.post-item:hover::before,
.post-item:hover::after {
  opacity: 0.6;
}

/* Add decorative elements to category buttons */
.category-list button::before {
  content: '[';
  position: absolute;
  left: -15px;
  color: var(--secondary-color);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.category-list button::after {
  content: ']';
  position: absolute;
  right: -15px;
  color: var(--secondary-color);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.category-list button:hover::before,
.category-list button:hover::after,
.category-list button.active::before,
.category-list button.active::after {
  opacity: 0.6;
}

/* Remove glitch hover intensity change */
.post-item:hover,
.category-list button:hover {
  /* --glitch-intensity: 2; */
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* Add decorative elements to headers */
.blog-header h1::before,
.blog-header h1::after {
  content: '//';
  position: absolute;
  color: var(--secondary-color);
  opacity: 0.4;
}

.blog-header h1::before {
  left: -30px;
}

.blog-header h1::after {
  right: -30px;
}

.blog-container {
  display: flex;
  min-height: calc(100vh - var(--nav-height));
  background: var(--bg-color);
  position: relative;
  overflow: hidden;
}

.blog-container::before {
  display: none;
}

.sidebar {
  width: 300px;
  background: var(--bg-color);
  backdrop-filter: none;
  border-right: var(--subtle-border);
  padding: 2rem;
  position: fixed;
  height: calc(100vh - var(--nav-height));
  overflow-y: auto;
  box-shadow: none;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-header {
  margin-bottom: 1rem;
}

.sidebar-header h2 {
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-shadow: none;
}

.search-box {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--hover-bg-color);
  border: 1px solid var(--subtle-border-color);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 0.9rem;
  transition: all var(--transition-speed) ease;
  font-family: var(--monospace-font);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color-transparent, rgba(52, 58, 64, 0.25));
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-item-wrapper {
  position: relative;
}

.category-button {
  position: relative;
  padding: 0.75rem 1rem;
  border: 1px solid var(--subtle-border-color);
  background: transparent;
  color: var(--text-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  text-align: left;
  width: 100%;
  display: block;
}

.category-button:hover {
  background: var(--hover-bg-color);
  border-color: var(--primary-color);
  color: var(--text-color);
  transform: none;
  box-shadow: none;
}

.category-button.active {
  background: var(--primary-color);
  color: var(--bg-color);
  font-weight: 600;
  border-color: transparent;
}

.recent-posts h3 {
  color: var(--text-color);
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-shadow: none;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  position: relative;
  padding: 0.75rem 0;
  border-bottom: var(--subtle-border);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
}

.post-item:hover {
  transform: none;
  border-bottom-color: var(--primary-color);
  background-color: var(--hover-bg-color);
}

.post-title {
  display: block;
  color: var(--text-color);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.post-date {
  display: block;
  color: var(--text-very-muted-color);
  font-size: 0.8rem;
  font-family: var(--monospace-font);
}

.main-content {
  flex: 1;
  margin-left: 300px;
  padding: 2rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-header h1 {
  position: relative;
  display: inline-block;
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-shadow: none;
}

.subtitle {
  color: var(--text-muted-color);
  font-size: 1.2rem;
  letter-spacing: 0.5px;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-card {
  background: transparent;
  backdrop-filter: none;
  border-radius: 0;
  padding: 1.5rem 0;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  border: none;
  border-bottom: 1px solid var(--subtle-border-color);
  box-shadow: none;
}

.post-card:hover {
  transform: none;
  border-color: none;
  box-shadow: none;
  background: var(--hover-bg-color);
}

.post-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.post-header h2 {
  color: var(--text-color);
  font-size: 1.5rem;
  line-height: 1.4;
}

.post-meta {
  display: flex;
  gap: 1rem;
  color: var(--text-very-muted-color);
  font-size: 0.9rem;
  font-family: var(--monospace-font);
}

.article-excerpt {
  color: var(--text-muted-color);
  line-height: 1.6;
}

.post-footer {
  margin-top: 0.5rem;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
  transition: all var(--transition-speed) ease;
}

.read-more:hover {
  text-shadow: none;
}

.read-more:hover .link-arrow {
  transform: translateX(5px);
}

.subcategory-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-left: 1.5rem;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height 0.3s ease-out,
    opacity 0.3s ease-out;
}

.subcategory-list.visible {
  max-height: 200px;
  opacity: 1;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.subcategory-button {
  position: relative;
  padding: 0.5rem 0.75rem;
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  text-align: left;
  font-size: 0.9rem;
}

.subcategory-button:hover {
  background: var(--hover-bg-color);
  color: var(--text-color);
  transform: none;
  box-shadow: none;
}

.subcategory-button.active {
  background: var(--secondary-color);
  color: var(--bg-color);
  font-weight: 600;
  border-color: transparent;
}

.subcategory {
  font-style: italic;
  color: var(--text-very-muted-color);
  margin-left: 0.5rem;
}

@media (max-width: 1024px) {
  .sidebar {
    width: 250px;
  }

  .main-content {
    margin-left: 250px;
  }
}

@media (max-width: 768px) {
  .blog-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: var(--subtle-border);
  }

  .main-content {
    margin-left: 0;
    padding: 1.5rem;
  }

  .blog-header h1 {
    font-size: 2.5rem;
  }

  .post-card {
    padding: 1.25rem 0;
  }

  .subcategory-list {
    margin-left: 1rem;
  }

  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }

  .page-numbers {
    order: 2;
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }

  .page-number {
    min-width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .page-numbers .page-number:not(.active):not(:first-child):not(:last-child) {
    display: none;
  }
}

.pagination {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.pagination-info {
  color: var(--text-muted-color);
  font-size: 0.9rem;
  font-family: var(--monospace-font);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-btn,
.page-number {
  background: transparent;
  border: 1px solid var(--subtle-border-color);
  color: var(--text-color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  font-family: var(--monospace-font);
  font-size: 0.9rem;
}

.page-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

.page-number {
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.page-number.active {
  background: var(--primary-color);
  color: var(--bg-color);
  border-color: var(--primary-color);
}
</style>
