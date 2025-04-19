<template>
  <div class="about-container">
    <section class="about-section">
      <!-- Profile Section -->
      <div class="profile">
        <div class="symbol-container">
          <div class="symbol">
            <div class="circle"></div>
            <div class="pulse"></div>
            <div class="orbital">
              <span class="dot"></span>
            </div>
            <div class="orbital orbital-2">
              <span class="dot"></span>
            </div>
          </div>
        </div>
        <h1 class="title reveal-text">About Me</h1>
        <div class="content">
          <p class="description fade-in">
            Welcome to my corner of the internet. I'm passionate about exploring the world. Through
            this blog, I share my insights, experiences, and discoveries in these fascinating
            fields.
          </p>

          <div class="connect fade-in">
            <h2>Let's Connect</h2>
            <p>
              Feel free to reach out for collaborations or just to share ideas. You can find me on
              <a href="#" class="link hover-effect">Twitter</a>,
              <a href="#" class="link hover-effect">GitHub</a>, or
              <a href="#" class="link hover-effect">LinkedIn</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Add these variables at the top of your style section */
:root {
  --primary-color: #42b883; /* Vue.js green, or choose your color */
  --primary-color-rgb: 66, 184, 131;
  --text-color: #2c3e50;
  --text-muted-color: #666;
  --bg-color: #ffffff;
  --secondary-color: #35495e;
  --border-radius: 4px;
}

.about-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.about-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile {
  width: 100%;
  text-align: center;
}

/* Symbolic Animation */
.symbol-container {
  width: 200px;
  height: 200px;
  margin: 0 auto 3rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.symbol {
  position: relative;
  width: 80px;
  height: 80px;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.circle {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--primary-color);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  animation: ripple 2s ease-in-out infinite;
}

.orbital {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px dashed rgba(var(--primary-color-rgb), 0.3);
  border-radius: 50%;
  animation: rotate 8s linear infinite;
}

.orbital-2 {
  width: 140%;
  height: 140%;
  animation: rotate 12s linear infinite reverse;
}

.dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--primary-color);
  border-radius: 50%;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px var(--primary-color);
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.9;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.9;
  }
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 2rem;
}

.content {
  text-align: left;
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-muted-color);
  margin-bottom: 3rem;
}

.connect {
  margin-top: 3rem;
}

.connect h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.connect p {
  color: var(--text-muted-color);
  line-height: 1.6;
}

.link {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.link:hover {
  border-bottom-color: var(--primary-color);
}

/* Text reveal animation */
.reveal-text {
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: revealText 0.8s ease forwards;
}

@keyframes revealText {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade in animation */
.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  animation-delay: 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Enhanced link hover effect */
.hover-effect {
  position: relative;
  padding: 2px 4px;
}

.hover-effect::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.hover-effect:hover::before {
  transform: scaleX(1);
}

/* Enhanced pulse animation */
.pulse {
  animation: enhancedRipple 3s ease-in-out infinite;
}

@keyframes enhancedRipple {
  0% {
    transform: scale(1);
    opacity: 1;
    border-color: var(--primary-color);
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
    border-color: var(--secondary-color);
  }
  100% {
    transform: scale(2);
    opacity: 0;
    border-color: var(--primary-color);
  }
}

@media (max-width: 768px) {
  .about-container {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .description {
    font-size: 1.1rem;
  }

  .symbol-container {
    width: 150px;
    height: 150px;
  }

  .orbital {
    width: 120%;
    height: 120%;
  }

  .orbital-2 {
    width: 160%;
    height: 160%;
  }
}

.fade-in,
.reveal-text {
  opacity: 1 !important;
  animation: none !important;
}
</style>
