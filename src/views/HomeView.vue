<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// Typewriter effect for the main slogan
const mainSlogan = 'EXPLORING THE WORLD'
const displayedSlogan = ref('')
const slogan2 = ref('SECURITY • TECHNOLOGY • FINANCE')
let typewriterInterval = null

onMounted(() => {
  // Start typewriter effect for main slogan
  let charIndex = 0
  typewriterInterval = setInterval(() => {
    if (charIndex < mainSlogan.length) {
      displayedSlogan.value = mainSlogan.substring(0, charIndex + 1)
      charIndex++
    } else {
      clearInterval(typewriterInterval)
    }
  }, 100)
})
</script>

<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">
          <span class="typed-text">{{ displayedSlogan }}</span>
          <span
            class="cursor"
            :class="{ typing: displayedSlogan.length < mainSlogan.length }"
          ></span>
        </h1>
        <p class="sub-title">{{ slogan2 }}</p>
        <div class="hero-buttons">
          <RouterLink to="/blog" class="hero-button primary">
            <span class="button-text">EXPLORE BLOG</span>
            <span class="button-arrow">→</span>
          </RouterLink>
          <RouterLink to="/about" class="hero-button secondary">
            <span class="button-text">ABOUT</span>
            <span class="button-arrow">→</span>
          </RouterLink>
        </div>
      </div>

      <!-- Interactive Particle Network -->
      <div class="hearts-container">
        <div class="heart-wrapper">
          <div class="heart-group">
            <div class="heart heart-main"></div>
            <div class="heart heart-background"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Content Section -->
    <section class="featured-section">
      <h2 class="section-title">FEATURED <span class="highlight">TOPICS</span></h2>

      <div class="featured-cards">
        <!-- Cybersecurity Card -->
        <div class="feature-card">
          <div class="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3 class="card-title">Cybersecurity</h3>
          <p class="card-description">
            Explore the latest in digital security, penetration testing, and threat protection.
          </p>
          <RouterLink to="/blog" class="card-link">
            <span>Learn More</span>
            <span class="link-arrow">→</span>
          </RouterLink>
        </div>

        <!-- Technology Card -->
        <div class="feature-card">
          <div class="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <h3 class="card-title">Technology</h3>
          <p class="card-description">
            Analysis and tutorials on cutting-edge tech and innovation.
          </p>
          <RouterLink to="/blog" class="card-link">
            <span>Learn More</span>
            <span class="link-arrow">→</span>
          </RouterLink>
        </div>

        <!-- Finance Card -->
        <div class="feature-card">
          <div class="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h3 class="card-title">Finance</h3>
          <p class="card-description">
            Deep dives into financial systems, blockchain, and cryptocurrency analysis.
          </p>
          <RouterLink to="/blog" class="card-link">
            <span>Learn More</span>
            <span class="link-arrow">→</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Latest Articles Section -->
    <section class="latest-section">
      <h2 class="section-title">LATEST <span class="highlight">INSIGHTS</span></h2>

      <div class="latest-grid">
        <article class="latest-article featured">
          <div class="article-meta">
            <span class="article-category">TECHNOLOGY</span>
            <span class="article-date">APR 20, 2024</span>
          </div>
          <h3 class="article-title">The Future of Quantum Computing and Its Implications</h3>
          <p class="article-excerpt">
            An exploration of how quantum computing is set to revolutionize computational capability
            and the security concerns it presents.
          </p>
          <RouterLink to="/blog/future-of-quantum-computing" class="article-link">
            <span>Read Full Article</span>
            <span class="link-arrow">→</span>
          </RouterLink>
        </article>

        <article class="latest-article">
          <div class="article-meta">
            <span class="article-category">HACKING</span>
            <span class="article-date">APR 18, 2024</span>
          </div>
          <h3 class="article-title">Understanding Web Security Fundamentals</h3>
          <p class="article-excerpt">
            A comprehensive guide to the foundations of web security and common vulnerabilities.
          </p>
          <RouterLink to="/blog/understanding-web-security" class="article-link">
            <span>Read Full Article</span>
            <span class="link-arrow">→</span>
          </RouterLink>
        </article>

        <article class="latest-article">
          <div class="article-meta">
            <span class="article-category">FINANCE</span>
            <span class="article-date">APR 16, 2024</span>
          </div>
          <h3 class="article-title">Blockchain in Modern Finance</h3>
          <p class="article-excerpt">
            How blockchain technology is transforming the financial industry...
          </p>
          <RouterLink to="/blog/blockchain-in-modern-finance" class="article-link">
            <span>Read Full Article</span>
            <span class="link-arrow">→</span>
          </RouterLink>
        </article>
      </div>

      <div class="view-all-container">
        <RouterLink to="/blog" class="view-all-link">
          <span>VIEW ALL ARTICLES</span>
          <span class="link-arrow">→</span>
        </RouterLink>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="newsletter-content">
        <h2 class="section-title">STAY <span class="highlight">INFORMED</span></h2>
        <p class="newsletter-description">
          Subscribe to receive the latest updates and insights directly to your inbox.
        </p>

        <form class="newsletter-form">
          <input type="email" placeholder="Your email address" class="newsletter-input" />
          <button type="submit" class="newsletter-button">SUBSCRIBE</button>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  height: calc(100vh - var(--nav-height) - 4rem);
  min-height: 580px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
}

.hero-content {
  width: 50%;
  z-index: 2;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  position: relative;
  color: var(--text-color);
}

.typed-text {
  display: inline-block;
  position: relative;
}

.cursor {
  display: inline-block;
  width: 3px;
  height: 50px;
  background-color: var(--secondary-color);
  margin-left: 5px;
  animation: blink 1s step-end infinite;
  position: relative;
  top: 5px;
}

.cursor.typing {
  animation: none;
}

@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.sub-title {
  font-size: 1.2rem;
  color: var(--text-muted-color);
  margin-bottom: 3rem;
  font-family: var(--monospace-font);
  letter-spacing: 1px;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-speed) ease;
  font-family: var(--monospace-font);
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.hero-button.primary {
  background: var(--primary-color);
  color: var(--bg-color);
  border: none;
}

.hero-button.secondary {
  background: transparent;
  color: var(--text-color);
  border: 1px solid var(--subtle-border-color);
}

.hero-button .button-arrow {
  display: inline-block;
  transition: transform var(--transition-speed) ease;
}

.hero-button:hover .button-arrow {
  transform: translateX(5px);
}

.hero-button.primary:hover {
  background: var(--text-color);
}

.hero-button.secondary:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

/* Interactive Particle Network */
.hearts-container {
  position: absolute;
  right: 0;
  width: 55%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heart-group {
  position: relative;
  width: 150px;
  height: 150px;
}

.heart {
  position: absolute;
  width: 100%;
  height: 100%;
  background: currentColor;
  transform-origin: center;
}

.heart::before,
.heart::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: 50%;
}

.heart::before {
  left: -50%;
}

.heart::after {
  top: -50%;
}

.heart-main {
  color: var(--primary-color);
  transform: rotate(45deg);
  animation: heartBeat 1.2s ease-in-out infinite;
  z-index: 2;
}

.heart-background {
  color: var(--secondary-color);
  transform: rotate(45deg) scale(0.9);
  animation: heartBeatBg 1.2s ease-in-out infinite;
  animation-delay: 0.3s;
  z-index: 1;
}

@keyframes heartBeat {
  0%,
  100% {
    transform: rotate(45deg) scale(0.9);
  }
  50% {
    transform: rotate(45deg) scale(1);
  }
}

@keyframes heartBeatBg {
  0%,
  100% {
    transform: rotate(45deg) scale(0.85);
    opacity: 0.5;
  }
  50% {
    transform: rotate(45deg) scale(0.95);
    opacity: 0.7;
  }
}

/* Add these styles to ensure theme compatibility */
:root[data-theme='light'] .heart-main {
  filter: drop-shadow(0 0 8px rgba(var(--primary-color-rgb), 0.3));
}

:root[data-theme='light'] .heart-background {
  filter: drop-shadow(0 0 8px rgba(var(--secondary-color-rgb), 0.3));
}

:root[data-theme='dark'] .heart-main {
  filter: drop-shadow(0 0 12px rgba(var(--primary-color-rgb), 0.4));
}

:root[data-theme='dark'] .heart-background {
  filter: drop-shadow(0 0 12px rgba(var(--secondary-color-rgb), 0.4));
}

/* Featured Section */
.featured-section {
  padding: 6rem 0;
  position: relative;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
  color: var(--text-color);
}

.section-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 60px;
  height: 3px;
  background-color: var(--secondary-color);
}

.highlight {
  color: var(--secondary-color);
}

.featured-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature-card {
  background: var(--bg-color);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--subtle-border-color);
  transition: all var(--transition-speed) ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background-color: var(--primary-color);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform var(--transition-speed) ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.feature-card:hover::before {
  transform: scaleY(1);
}

.card-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.card-description {
  color: var(--text-muted-color);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: gap var(--transition-speed) ease;
}

.card-link:hover {
  gap: 0.75rem;
}

.link-arrow {
  transition: transform var(--transition-speed) ease;
}

.card-link:hover .link-arrow {
  transform: translateX(3px);
}

/* Latest Articles Section */
.latest-section {
  padding: 6rem 0;
  background-color: var(--bg-color);
  position: relative;
}

.latest-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.latest-article {
  background: var(--bg-color);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--subtle-border-color);
  transition: all var(--transition-speed) ease;
}

.latest-article:hover {
  border-color: var(--primary-color);
  transform: translateY(-5px);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-family: var(--monospace-font);
  font-size: 0.8rem;
}

.article-category {
  color: var(--secondary-color);
  font-weight: 600;
}

.article-date {
  color: var(--text-very-muted-color);
}

.article-title {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: var(--text-color);
}

.article-excerpt {
  color: var(--text-muted-color);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
}

.article-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}

.article-link:hover .link-arrow {
  transform: translateX(3px);
}

.latest-article.featured {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.view-all-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--subtle-border-color);
  border-radius: var(--border-radius);
  text-decoration: none;
  color: var(--text-color);
  font-weight: 600;
  transition: all var(--transition-speed) ease;
  font-family: var(--monospace-font);
  letter-spacing: 1px;
}

.view-all-link:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.view-all-link:hover .link-arrow {
  transform: translateX(5px);
}

/* Newsletter Section */
.newsletter-section {
  padding: 6rem 0;
  background-color: var(--bg-color);
  position: relative;
  border-top: 1px solid var(--subtle-border-color);
}

.newsletter-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.newsletter-description {
  color: var(--text-muted-color);
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--subtle-border-color);
  border-radius: var(--border-radius);
  background-color: transparent;
  color: var(--text-color);
  font-family: var(--monospace-font);
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.newsletter-button {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: var(--bg-color);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  transition: background-color var(--transition-speed) ease;
  font-family: var(--monospace-font);
  letter-spacing: 1px;
}

.newsletter-button:hover {
  background-color: var(--text-color);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .hero-content {
    width: 60%;
  }

  .featured-cards,
  .latest-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .latest-article.featured {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .hero-section {
    flex-direction: column;
    height: auto;
    text-align: center;
    padding-top: 4rem;
  }

  .hero-content {
    width: 100%;
    order: 2;
  }

  .featured-cards,
  .latest-grid {
    grid-template-columns: 1fr;
  }

  .latest-article.featured {
    grid-column: span 1;
    grid-template-columns: 1fr;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .hearts-container {
    position: relative;
    width: 100%;
    height: 300px;
    order: 1;
    margin-bottom: 3rem;
  }

  .heart-wrapper {
    width: 200px;
    height: 200px;
  }

  .heart-group {
    width: 100px;
    height: 100px;
  }
}
</style>
