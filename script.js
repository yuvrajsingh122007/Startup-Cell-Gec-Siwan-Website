/* =============================================
   GEC SIWAN STARTUP CELL - SCRIPT.JS
   ============================================= */

// ── Navbar Scroll Effect ──────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Active Nav Link on Scroll ─────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = { threshold: 0.35 };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ── Hamburger Mobile Menu ─────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
});

// Close menu on nav link click (mobile)
navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksMenu.classList.remove('open');
  });
});

// ── Toast Notification Helper ─────────────────
function showToast(message = 'Submitted successfully!') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  toastMsg.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ── Idea Form Submit ──────────────────────────
const ideaForm = document.getElementById('ideaForm');
ideaForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting…';
  setTimeout(() => {
    ideaForm.reset();
    btn.disabled = false;
    btn.innerHTML = 'Submit Idea <i class="fa-solid fa-paper-plane"></i>';
    showToast('🚀 Your idea has been submitted!');
  }, 1200);
});

// ── Contact Form Submit ───────────────────────
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
  setTimeout(() => {
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
    showToast('✅ Message sent successfully!');
  }, 1200);
});

// ── Scroll Reveal Animation ───────────────────
const revealElements = document.querySelectorAll(
  '.service-card, .team-card, .about-inner, .idea-form-wrap, .contact-inner, .section-header'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ── Staggered Cards ───────────────────────────
document.querySelectorAll('.service-card, .team-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// ── Smooth scroll for all anchor links ───────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});