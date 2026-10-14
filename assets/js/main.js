/**
 * Ioannis Ktenidis - Minimal & Futuristic Portfolio (Brittany Chiang inspired)
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initMouseSpotlight();
  initScrollSpy();
  fetchLiveGitHubStats();
  updateCurrentYear();
});

/* ----------------------------------------------------
 * Interactive Mouse Spotlight Glow
 * ---------------------------------------------------- */
function initMouseSpotlight() {
  const spotlight = document.getElementById('mouse-spotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
}

/* ----------------------------------------------------
 * ScrollSpy Navigation with Expanding Indicator Line
 * ---------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ----------------------------------------------------
 * Live GitHub API Sync
 * ---------------------------------------------------- */
async function fetchLiveGitHubStats() {
  const username = 'IoannisKtenidis';
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    if (!response.ok) return;

    const repos = await response.json();
    const repoMap = new Map();
    repos.forEach(repo => repoMap.set(repo.name.toLowerCase(), repo));

    document.querySelectorAll('[data-repo-name]').forEach(card => {
      const repoName = card.getAttribute('data-repo-name').toLowerCase();
      const repo = repoMap.get(repoName);
      if (repo) {
        const starsEl = card.querySelector('.repo-stars');
        const forksEl = card.querySelector('.repo-forks');
        if (starsEl) starsEl.textContent = repo.stargazers_count;
        if (forksEl) forksEl.textContent = repo.forks_count;
      }
    });
  } catch (error) {
    console.warn('GitHub API offline / rate limited:', error);
  }
}

/* ----------------------------------------------------
 * Update Year
 * ---------------------------------------------------- */
function updateCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
