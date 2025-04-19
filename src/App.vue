<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import BuyMeCoffeeButton from './components/BuyMeCoffeeButton.vue'

const currentTheme = ref('dark') // Default theme

// Function to toggle theme
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
}

// Watch for theme changes and update body class + localStorage
watch(currentTheme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
})

// Check localStorage for saved theme on component mount
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    currentTheme.value = savedTheme
  } else {
    // Optional: Detect system preference if no theme is saved
    // const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // currentTheme.value = prefersDark ? 'dark' : 'light';
  }
  // Apply the initial theme
  document.documentElement.setAttribute('data-theme', currentTheme.value)
})
</script>

<template>
  <div class="app-container">
    <nav class="sci-fi-nav">
      <div class="nav-content">
        <RouterLink to="/" class="nav-logo">
          <span class="logo-text" data-text="XCT">
            <div class="stack" style="--stacks: 3">
              <span style="--index: 0">X</span>
              <span style="--index: 1">X</span>
              <span style="--index: 2">X</span>
            </div></span
          >
          <span class="logo-glow"></span>
          <span class="logo-border"></span>
        </RouterLink>

        <div class="nav-links">
          <RouterLink to="/" class="nav-link">
            <span class="link-text" data-text="Home">Home</span>
            <span class="link-underline"></span>
          </RouterLink>
          <RouterLink to="/blog" class="nav-link">
            <span class="link-text" data-text="Blog">Blog</span>
            <span class="link-underline"></span>
          </RouterLink>
          <RouterLink to="/about" class="nav-link">
            <span class="link-text" data-text="About">About</span>
            <span class="link-underline"></span>
          </RouterLink>
        </div>

        <button @click="toggleTheme" class="theme-toggle-button" aria-label="Toggle theme">
          <div class="icon-container">
            <!-- Sun icon for dark mode (clicking switches to light) -->
            <svg
              v-if="currentTheme === 'dark'"
              class="theme-icon sun-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <!-- Moon icon for light mode (clicking switches to dark) -->
            <svg
              v-else
              class="theme-icon moon-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </div>
        </button>
      </div>
    </nav>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="sci-fi-footer">
      <div class="footer-content">
        <div class="footer-left">
          <p class="footer-text">© 2024 XCT - Exploring the Future</p>
          <BuyMeCoffeeButton />
        </div>
        <div class="footer-links">
          <a href="#" class="footer-link">
            <span class="link-text" data-text="GitHub">GitHub</span>
            <span class="link-underline"></span>
          </a>
          <a href="#" class="footer-link">
            <span class="link-text" data-text="Twitter">Twitter</span>
            <span class="link-underline"></span>
          </a>
          <a href="#" class="footer-link">
            <span class="link-text" data-text="Contact">Contact</span>
            <span class="link-underline"></span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Default (Dark Theme) Variables */
:root {
  --primary-color: #ffffff;
  --secondary-color: #00ff00;
  --accent-color: #ff0000;
  --bg-color: #000000;
  --text-color: #ffffff;
  --subtle-border-color: rgba(255, 255, 255, 0.1);
  --hover-bg-color: rgba(255, 255, 255, 0.05);
  --nav-bg-color: var(--bg-color); /* Use base bg for nav */
  --footer-bg-color: var(--bg-color);
  --text-muted-color: rgba(255, 255, 255, 0.7);
  --text-very-muted-color: rgba(255, 255, 255, 0.5);
  --noise-opacity: 0.03;
  --scanline-opacity: 0.02;

  /* Shared variables */
  --nav-height: 70px;
  --border-radius: 4px;
  --transition-speed: 0.2s;
  --monospace-font: 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
  --glitch-intensity: 1;
}

/* Light Theme Variables */
html[data-theme='light'] {
  --primary-color: #343a40; /* Dark grey for primary actions/active states */
  --secondary-color: #6c757d; /* Medium grey for secondary elements */
  --accent-color: #adb5bd; /* Light grey for accents/borders if needed */
  --bg-color: #ffffff; /* White background */
  --text-color: #212529; /* Very dark grey/almost black text */
  --subtle-border-color: #dee2e6; /* Lighter grey border */
  --hover-bg-color: #e9ecef; /* Light grey hover */
  --nav-bg-color: #ffffff; /* White nav */
  --footer-bg-color: #f8f9fa; /* Slightly off-white footer */
  --text-muted-color: #6c757d; /* Use secondary grey for muted text */
  --text-very-muted-color: #adb5bd; /* Use accent grey for very muted text */
  --noise-opacity: 0; /* Disable noise/scanlines in light mode */
  --scanline-opacity: 0;

  /* Overrides for elements */
  .sci-fi-nav {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-bottom-color: var(--subtle-border-color);
  }

  .sci-fi-footer {
    border-top-color: var(--subtle-border-color);
  }

  /* Adjust glitch colors for B&W theme */
  .nav-logo .logo-text::before {
    text-shadow: 1px 0 var(--secondary-color);
    color: var(--secondary-color);
  }

  .nav-logo .logo-text::after {
    text-shadow: -1px 0 var(--primary-color);
    color: var(--primary-color);
  }

  /* Adjust decorative element colors */
  .nav-link::before,
  .footer-link::before,
  .nav-content::before,
  .footer-content::before,
  .nav-content::after,
  .footer-content::after {
    color: var(--secondary-color);
    opacity: 0.6; /* Make them a bit more visible */
  }
  .nav-link::after,
  .footer-link::after {
    color: var(--primary-color); /* Use primary for the 'x' */
    opacity: 0.6;
  }

  /* Ensure button hover text is light on dark background */
  .theme-toggle-button:hover {
    color: var(--bg-color); /* Should be white */
  }

  .nav-link:hover .link-text {
    color: var(--primary-color); /* Use dark grey for link hover text */
  }
  .nav-link:hover .link-underline {
    background: var(--primary-color);
  }
  .footer-link:hover .link-text {
    color: var(--primary-color);
  }
}

@keyframes subtle-noise {
  0% {
    background-position: 0 0;
  }
  10% {
    background-position: -5% -5%;
  }
  20% {
    background-position: -10% 5%;
  }
  30% {
    background-position: 5% -10%;
  }
  40% {
    background-position: -5% 15%;
  }
  50% {
    background-position: -10% 5%;
  }
  60% {
    background-position: 15% 0;
  }
  70% {
    background-position: 0 10%;
  }
  80% {
    background-position: -15% -10%;
  }
  90% {
    background-position: 10% 5%;
  }
  100% {
    background-position: 5% 0;
  }
}

@keyframes glitch {
  0% {
    clip-path: inset(40% 0 61% 0);
    transform: translate(-2px, 2px);
  }
  20% {
    clip-path: inset(92% 0 1% 0);
    transform: translate(1px, -3px);
  }
  40% {
    clip-path: inset(43% 0 1% 0);
    transform: translate(-1px, 3px);
  }
  60% {
    clip-path: inset(25% 0 58% 0);
    transform: translate(3px, 1px);
  }
  80% {
    clip-path: inset(54% 0 7% 0);
    transform: translate(-3px, -2px);
  }
  100% {
    clip-path: inset(58% 0 43% 0);
    transform: translate(2px, 2px);
  }
}

@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-image: none;
  position: relative; /* Needed for pseudo-element */
  transition:
    background-color var(--transition-speed) ease,
    color var(--transition-speed) ease; /* Smooth theme transition */
}

body::before {
  content: '';
  position: fixed; /* Use fixed to cover viewport */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAElBMVEUAAAAAAAAAAAAAAAAAAAAAAADgKxmiAAAABnRSTlMDAwMDAwPduPR+AAAASUlEQVQ4y2NgQAX8DKiAH58EI14JJnwSzPgkWGAkQPGYgBGfBDMDQcCMV4KwNcjWYHUeVomRIcGAV4INqwTBsYRXQoCABKMiAH8qCgTCmuIyAAAAAElFTkSuQmCC');
  background-repeat: repeat;
  opacity: var(--noise-opacity); /* Use variable */
  animation: subtle-noise 0.5s steps(5, end) infinite both;
  pointer-events: none; /* Ensure it doesn't interfere with interaction */
  z-index: -1; /* Place it behind content */
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent; /* Let body background show */
}

.sci-fi-nav {
  background: var(--nav-bg-color);
  backdrop-filter: none;
  border-bottom: 1px solid var(--subtle-border-color);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  z-index: 1000;
  box-shadow: none;
  transition:
    background-color var(--transition-speed) ease,
    border-color var(--transition-speed) ease; /* Smooth theme transition */
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem; /* Add gap to accommodate button */
}

.nav-logo {
  position: relative;
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 0.5rem 1rem;
  text-shadow: none;
  transition: all var(--transition-speed) ease;
}

.logo-glow,
.logo-border {
  display: none;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-link {
  position: relative;
  text-decoration: none;
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color var(--transition-speed) ease;
  overflow: hidden; /* Needed for glitch effect */
}

.nav-link .link-text::before,
.nav-link .link-text::after {
  /* Remove glitch properties */
  display: none; /* Hide the pseudo-elements */
  /* content: none;
  position: static;
  animation: none;
  text-shadow: none;
  clip-path: none; */
}

.nav-link:hover .link-text::before,
.nav-link:hover .link-text::after {
  /* Remove hover enhancement related to glitch intensity */
  /* --glitch-intensity: 2; */ /* Remove glitch intensity change */
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.link-text {
  position: relative;
  z-index: 1;
  transition: all var(--transition-speed) ease;
}

.link-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary-color);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform var(--transition-speed) cubic-bezier(0.19, 1, 0.22, 1); /* Faster, sharper out */
  border-radius: 2px;
}

.nav-link:hover .link-text {
  color: var(--primary-color);
  text-shadow: none;
}

.nav-link:hover .link-underline {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-link::before,
.footer-link::before {
  content: '///';
  position: absolute;
  left: -20px;
  color: var(--secondary-color);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.nav-link::after,
.footer-link::after {
  content: '×';
  position: absolute;
  right: -15px;
  color: var(--accent-color);
  opacity: 0;
  transition: opacity var(--transition-speed) ease;
}

.nav-link:hover::before,
.nav-link:hover::after,
.footer-link:hover::before,
.footer-link:hover::after {
  opacity: 0.6;
}

.main-content {
  margin-top: var(--nav-height);
  flex: 1;
  padding: 2rem;
  position: relative; /* Ensure content is above body::before */
  z-index: 1;
}

.sci-fi-footer {
  background: var(--footer-bg-color);
  border-top: 1px solid var(--subtle-border-color);
  padding: 1.5rem 0;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  position: relative;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 2rem;
  animation: slideInLeft 0.6s ease-out both;
}

.footer-text {
  color: var(--text-muted-color);
  font-size: 0.9rem;
  position: relative;
  padding-left: 1.5rem;
  white-space: nowrap;
}

.footer-text::before {
  content: '>';
  position: absolute;
  left: 0;
  color: var(--secondary-color);
  opacity: 0.6;
  animation: pulseOpacity 2s infinite;
}

.footer-links {
  display: flex;
  gap: 2rem;
  animation: slideInRight 0.6s ease-out both;
}

.footer-link {
  position: relative;
  text-decoration: none;
  color: var(--text-color);
  font-size: 0.9rem;
  padding: 0.25rem 0;
  transition: all var(--transition-speed) ease;
}

/* Enhanced link hover effect */
.footer-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -0.5rem;
  width: 2px;
  height: 100%;
  background: var(--secondary-color);
  transform: scaleY(0);
  transition: transform 0.2s ease;
}

.footer-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--primary-color);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.footer-link:hover {
  color: var(--primary-color);
  transform: translateX(0.5rem);
}

.footer-link:hover::before {
  transform: scaleY(1);
}

.footer-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Buy Me Coffee button enhancements */
.bmc-button {
  position: relative;
  display: inline-block;
  transition: all 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

.bmc-button::after {
  content: '';
  position: absolute;
  inset: -4px;
  background: linear-gradient(
    45deg,
    var(--secondary-color) 0%,
    transparent 40%,
    transparent 60%,
    var(--accent-color) 100%
  );
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.bmc-button:hover {
  transform: translateY(-2px) scale(1.02);
}

.bmc-button:hover::after {
  opacity: 0.2;
}

.bmc-button img {
  height: 50px;
  width: auto;
  border-radius: 8px;
  transition: all 0.3s ease;
}

/* Updated animations */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulseOpacity {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.2;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .footer-left {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .footer-text {
    padding-left: 0;
  }

  .footer-text::before {
    display: none;
  }

  .footer-links {
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .footer-link:hover {
    transform: translateX(0);
  }
}

/* Add scanline effect */
.app-container::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    transparent 50%,
    hsla(0, 0%, 0%, var(--scanline-opacity)) 50%
  ); /* Use black scanline base */
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 9999;
}

/* Ensure logo glitch background matches theme */
.nav-logo .logo-text::before,
.nav-logo .logo-text::after {
  background: var(--nav-bg-color);
}

/* Ensure decorative elements use theme colors */
.nav-link::before,
.footer-link::before,
.nav-content::before,
.footer-content::before,
.nav-content::after,
.footer-content::after {
  color: var(--secondary-color);
}
.nav-link::after,
.footer-link::after {
  color: var(--accent-color);
}

.theme-toggle-button {
  background: transparent;
  color: var(--text-color);
  border: none;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-speed) ease;
  width: 40px;
  height: 40px;
}

.theme-toggle-button:hover {
  background: var(--hover-bg-color);
  color: var(--primary-color);
  border-color: transparent;
}

.icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.theme-icon {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.sun-icon {
  color: var(--primary-color);
}

.moon-icon {
  color: var(--primary-color);
}

/* Don't need these overrides anymore */
html[data-theme='light'] .theme-toggle-button:hover {
  color: var(--primary-color);
}

.stack {
  display: grid;
  grid-template-columns: 1fr;
  font-family: emoji;
}

.stack span {
  font-weight: bold;
  grid-row-start: 1;
  grid-column-start: 1;
  font-size: 2rem;
  --stack-height: calc(100% / var(--stacks) - 1px);
  --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
  --clip-top: calc(var(--stack-height) * var(--index));
  --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
  clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
  animation:
    stack 340ms cubic-bezier(0.46, 0.29, 0, 1.24) 1 backwards calc(var(--index) * 120ms),
    glitch 2s ease infinite 2s alternate-reverse;
}

.stack span:nth-child(odd) {
  --glitch-translate: 8px;
}
.stack span:nth-child(even) {
  --glitch-translate: -8px;
}

@keyframes stack {
  0% {
    opacity: 0;
    transform: translateX(-50%);
    text-shadow:
      -2px 3px 0 red,
      2px -3px 0 blue;
  }
  60% {
    opacity: 0.5;
    transform: translateX(50%);
  }
  80% {
    transform: none;
    opacity: 1;
    text-shadow:
      2px -3px 0 red,
      -2px 3px 0 blue;
  }
  100% {
    text-shadow: none;
  }
}

@keyframes glitch {
  0% {
    text-shadow:
      -2px 3px 0 red,
      2px -3px 0 blue;
    transform: translate(var(--glitch-translate));
  }
  2% {
    text-shadow:
      2px -3px 0 red,
      -2px 3px 0 blue;
  }
  4%,
  100% {
    text-shadow: none;
    transform: none;
  }
}
</style>
