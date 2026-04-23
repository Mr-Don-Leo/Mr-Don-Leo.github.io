/* =============================================
   script.js — shared across all pages
   ============================================= */

/* -------------------------------------------
   1. Scroll → header glass transformation
   ------------------------------------------- */
(function () {
  const header = document.querySelector('header');
  if (!header) return;

  const SCROLL_THRESHOLD = 85;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled
})();


/* -------------------------------------------
   2. Desktop dropdown — toggle on click too
      (hover handled in CSS; click for keyboard)
   ------------------------------------------- */
(function () {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(function (dd) {
    const btn = dd.querySelector('.dropdown-btn');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dd.classList.contains('open');
      // close all first
      dropdowns.forEach(function (d) { d.classList.remove('open'); });
      if (!isOpen) dd.classList.add('open');
    });

    // keyboard support
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
      if (e.key === 'Escape') dd.classList.remove('open');
    });
  });

  // click outside → close all
  document.addEventListener('click', function () {
    dropdowns.forEach(function (d) { d.classList.remove('open'); });
  });
})();


/* -------------------------------------------
   3. Mobile hamburger + overlay menu
   ------------------------------------------- */
(function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    const opening = !hamburger.classList.contains('open');
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = opening ? 'hidden' : '';
  });

  // close when a direct link is tapped
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // ESC key closes menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* -------------------------------------------
   4. Mobile accordion — Features sub-links
   ------------------------------------------- */
(function () {
  const mobileFeatureBtn = document.getElementById('mobile-features-btn');
  const mobileSub = document.getElementById('mobile-features-sub');
  if (!mobileFeatureBtn || !mobileSub) return;

  mobileFeatureBtn.addEventListener('click', function () {
    mobileSub.classList.toggle('open');
    const arrow = mobileFeatureBtn.querySelector('.arrow');
    if (arrow) {
      arrow.style.transform = mobileSub.classList.contains('open')
        ? 'rotate(180deg)'
        : 'rotate(0deg)';
    }
  });
})();


/* -------------------------------------------
   4b. Mobile accordion — Fun Stuff sub-links
   ------------------------------------------- */
(function () {
  const mobileFunBtn = document.getElementById('mobile-fun-btn');
  const mobileFunSub = document.getElementById('mobile-fun-sub');
  if (!mobileFunBtn || !mobileFunSub) return;

  mobileFunBtn.addEventListener('click', function () {
    mobileFunSub.classList.toggle('open');
    const arrow = mobileFunBtn.querySelector('.arrow');
    if (arrow) {
      arrow.style.transform = mobileFunSub.classList.contains('open')
        ? 'rotate(180deg)'
        : 'rotate(0deg)';
    }
  });
})();


/* -------------------------------------------
   5. Active nav link (highlight current page)
   ------------------------------------------- */
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (
      linkPage === currentPage ||
      (currentPage === '' && (linkPage === 'index.html' || linkPage === ''))
    ) {
      link.classList.add('active');
    }
  });
})();


/* -------------------------------------------
   6. Contact form — mailto handler
   ------------------------------------------- */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.querySelector('#name')?.value.trim()    || '';
    const email   = form.querySelector('#email')?.value.trim()   || '';
    const subject = form.querySelector('#subject')?.value.trim() || 'Message from website';
    const message = form.querySelector('#message')?.value.trim() || '';

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:maksimababayan@gmail.com`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    // show success UI
    const successEl = document.getElementById('form-success');
    if (successEl) {
      form.style.display = 'none';
      successEl.classList.add('show');
    }
  });
})();
