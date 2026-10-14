/**
 * Ioannis Ktenidis - Personal Website & GitHub Profile Portfolio
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  initProjectFilters();
  fetchLiveGitHubStats();
  updateCurrentYear();
});

/* ----------------------------------------------------
 * Navigation & ScrollSpy (IntersectionObserver)
 * ---------------------------------------------------- */
function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ----------------------------------------------------
 * Mobile Sidebar Drawer Toggle
 * ---------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('close-mobile-menu-btn');
  const mobileSidebar = document.getElementById('mobile-sidebar');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    mobileSidebar.classList.remove('-translate-x-full');
    mobileBackdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileSidebar.classList.add('-translate-x-full');
    mobileBackdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }

  if (menuBtn) menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ----------------------------------------------------
 * Project Category Filter
 * ---------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update button styles
      filterBtns.forEach(b => {
        b.classList.remove('bg-sky-500', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      });
      btn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
      btn.classList.add('bg-sky-500', 'text-white', 'shadow-md');

      // Filter cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ----------------------------------------------------
 * GitHub Live API Sync (Stars, Forks, Updates)
 * ---------------------------------------------------- */
async function fetchLiveGitHubStats() {
  const username = 'IoannisKtenidis';
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
    if (!response.ok) return;

    const repos = await response.json();
    const repoMap = new Map();
    repos.forEach(repo => repoMap.set(repo.name.toLowerCase(), repo));

    // Update dynamically on cards with data-repo-name
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

    // Update total repo count badge if present
    const totalReposEl = document.getElementById('github-total-repos');
    if (totalReposEl) {
      totalReposEl.textContent = repos.length;
    }
  } catch (error) {
    console.warn('GitHub API fetch bypassed (offline or rate limited):', error);
  }
}

/* ----------------------------------------------------
 * Update Current Year
 * ---------------------------------------------------- */
function updateCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
