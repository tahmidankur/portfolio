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


/* ===== COMMIT GRID (decorative) ===== */
(function buildCommitGrid() {
  const grid = document.getElementById('commit-grid');
  if (!grid) return;

  // 52 weeks × 7 days = 364 cells
  // We make it look like a real contribution pattern:
  // heavier toward the last 6 months, sparse at start
  const totalCells = 52 * 7;
  const fragment   = document.createDocumentFragment();

  const weights = [
    [0, 50],   // l0 - empty
    [1, 22],   // l1 - light
    [2, 14],   // l2 - medium
    [3, 8],    // l3 - heavy
    [4, 6],    // l4 - max
  ];

  function weightedRandom(week) {
    // Heavier activity in second half of the year
    const bias = week / 52;
    const table = [];
    weights.forEach(([level, base]) => {
      let w = base;
      if (level === 0) w = Math.max(5, base - bias * 30);
      if (level >= 2) w = base + bias * 12;
      for (let i = 0; i < Math.round(w); i++) table.push(level);
    });
    return table[Math.floor(Math.random() * table.length)];
  }

  for (let week = 0; week < 52; week++) {
    for (let day = 0; day < 7; day++) {
      const cell = document.createElement('div');
      const level = weightedRandom(week);
      cell.className = `commit-cell l${level}`;
      fragment.appendChild(cell);
    }
  }

  grid.appendChild(fragment);
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


/* ===== CURSOR GLOW (desktop only, subtle) ===== */
(function cursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
    z-index: 0;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  let raf;
  let mx = -999, my = -999;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;

    if (raf) return;
    raf = requestAnimationFrame(() => {
      glow.style.left = mx + 'px';
      glow.style.top  = my + 'px';
      raf = null;
    });
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
  });
})();


/* ===== HERO TEXT ANIMATION (typewriter for "currently building") ===== */
(function animateBuildingCard() {
  const pills = document.querySelectorAll('.project-pill');
  if (!pills.length) return;

  pills.forEach((pill, i) => {
    pill.style.opacity = '0';
    pill.style.transform = 'translateY(6px)';
    pill.style.transition = 'opacity 0.4s, transform 0.4s';

    setTimeout(() => {
      pill.style.opacity = '1';
      pill.style.transform = 'translateY(0)';
    }, 800 + i * 150);
  });
})();


/* ===== SECTION TILT CARDS (subtle on desktop) ===== */
(function tiltCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.project-card, .value-card, .identity-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / rect.width;
      const dy     = (e.clientY - cy) / rect.height;
      const tiltX  = dy * 4;
      const tiltY  = -dx * 4;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ===== ACTIVE NAV UNDERLINE INDICATOR (CSS handles it; this just ensures correctness on load) ===== */
window.addEventListener('load', () => {
  const scrollEvent = new Event('scroll');
  window.dispatchEvent(scrollEvent);
});
