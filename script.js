'use strict';

/* ===== NAVBAR: scroll state + active section ===== */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = [];

  navLinks.forEach(link => {
    const id  = link.dataset.section;
    const el  = document.getElementById(id);
    if (el) sections.push({ id, el, link });
  });

  function updateScrolled() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }

  function updateActiveLink() {
    const viewH    = window.innerHeight;
    let   current  = null;

    sections.forEach(({ id, el }) => {
      if (el.getBoundingClientRect().top <= viewH * 0.45) current = id;
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

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

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


/* ===== STAGGER PROJECT CARDS on load ===== */
(function staggerCards() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });
})();
