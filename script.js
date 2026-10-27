/* =====================================================
   TAHMID HOSSAIN ANKUR — Portfolio
   script.js
   ===================================================== */

'use strict';

/* ===== NAVBAR: scroll state + active section ===== */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = [];

  // Collect all sections that nav links point to
  navLinks.forEach(link => {
    const id  = link.dataset.section;
    const el  = document.getElementById(id);
    if (el) sections.push({ id, el, link });
  });

  function updateScrolled() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function updateActiveLink() {
    const scrollY  = window.scrollY;
    const viewH    = window.innerHeight;
    let   current  = null;

    sections.forEach(({ id, el }) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= viewH * 0.45) {
        current = id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  updateScrolled();
  updateActiveLink();

  window.addEventListener('scroll', () => {
    updateScrolled();
    updateActiveLink();
  }, { passive: true });
})();


/* ===== HAMBURGER MENU ===== */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  function close() {
    btn.classList.remove('open');
    links.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when a link is clicked
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close when Escape key pressed
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  // Close when clicking outside
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      close();
    }
  });
})();


/* ===== SCROLL REVEAL (Intersection Observer) ===== */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold:  0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  els.forEach(el => observer.observe(el));
})();


/* ===== SMOOTH SCROLL for anchor links ===== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH   = document.getElementById('navbar')?.offsetHeight || 68;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ===== STAGGER PROJECT CARDS on load ===== */
(function staggerCards() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });
})();


/* ===== ACTIVE NAV UNDERLINE INDICATOR (CSS handles it; this just ensures correctness on load) ===== */
window.addEventListener('load', () => {
  const scrollEvent = new Event('scroll');
  window.dispatchEvent(scrollEvent);
});
