/* =========================================================
   NOIR & GOLD — Cafe Website Scripts
   Vanilla JS only. No dependencies.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------
     1. LOADING SCREEN
     Hide once window fully loads, with a small minimum
     delay so the animation is actually visible.
  ----------------------------------------------------- */
  const loader = document.getElementById('loader');
  const hideLoader = () => loader && loader.classList.add('hidden');
  const loaderStart = Date.now();
  window.addEventListener('load', () => {
    const elapsed = Date.now() - loaderStart;
    const remaining = Math.max(0, 900 - elapsed);
    setTimeout(hideLoader, remaining);
  });
  // Safety net: never let the loader block the page for more than 3s.
  setTimeout(hideLoader, 3000);


  /* -----------------------------------------------------
     2. STICKY NAVBAR (background on scroll)
  ----------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const onScrollNav = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });


  /* -----------------------------------------------------
     3. MOBILE NAV TOGGLE
  ----------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  const closeMobileNav = () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu whenever a nav link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });


  /* -----------------------------------------------------
     4. ACTIVE LINK HIGHLIGHT ON SCROLL
  ----------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let currentId = 'home';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    });
  };
  highlightNav();
  window.addEventListener('scroll', highlightNav, { passive: true });


  /* -----------------------------------------------------
     5. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  ----------------------------------------------------- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Stagger children of the same grid slightly for a premium feel
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('in-view'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    animatedEls.forEach((el, i) => {
      // small stagger for elements that share a parent grid
      el.dataset.delay = (i % 4) * 90;
      revealObserver.observe(el);
    });
  } else {
    // Fallback: just show everything
    animatedEls.forEach(el => el.classList.add('in-view'));
  }


  /* -----------------------------------------------------
     6. ANIMATED COUNTERS (About section stats)
  ----------------------------------------------------- */
  const counters = document.querySelectorAll('.stat-number');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    const format = (n) => n.toLocaleString('en-US');

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = format(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = format(target);
      }
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(el => counterObserver.observe(el));
  } else {
    counters.forEach(el => { el.textContent = el.dataset.count; });
  }


  /* -----------------------------------------------------
     7. BACK TO TOP BUTTON
  ----------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');

  const toggleBackToTop = () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  };
  toggleBackToTop();
  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* -----------------------------------------------------
     8. CONTACT FORM (client-side validation + fake submit)
     No backend is wired up — this simulates a submission
     and gives the user clear, immediate feedback.
  ----------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in your name, email and message.';
      formStatus.style.color = '#e88585';
      return;
    }

    if (!emailPattern.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.style.color = '#e88585';
      return;
    }

    // Simulate a successful reservation request
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      formStatus.style.color = '#e6c98a';
      formStatus.textContent = `Thank you, ${name.split(' ')[0]}! Your message has been received — we'll confirm your table shortly.`;
      submitBtn.textContent = originalLabel;
      submitBtn.disabled = false;
      contactForm.reset();
    }, 900);
  });


  /* -----------------------------------------------------
     9. FOOTER YEAR
  ----------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
