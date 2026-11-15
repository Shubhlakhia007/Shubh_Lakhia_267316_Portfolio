/* ============================================================
   SHUBH LAKHIA — PORTFOLIO JAVASCRIPT  (v2)
   script.js
   ============================================================ */
'use strict';

/* ==========================================
   1. DARK / LIGHT MODE TOGGLE
   ========================================== */
const themeBtn = document.getElementById('themeBtn');
const body     = document.body;

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeBtn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ==========================================
   2. HAMBURGER MENU (Mobile Nav)
   ========================================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ==========================================
   3. TYPED ROLE ANIMATION
   ========================================== */
const roles = [
  'Junior Penetration Tester',
  'VAPT Specialist',
  'AI Security Developer',
  'Web App Security Researcher',
  'CTF Player — THM Top 4%'
];

const typedEl  = document.getElementById('typed-role');
let   roleIdx  = 0;
let   charIdx  = 0;
let   isDelete = false;

function typeRole() {
  const current = roles[roleIdx];
  if (!isDelete) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDelete = true;
      setTimeout(typeRole, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      isDelete = false;
      roleIdx  = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDelete ? 55 : 100);
}
typeRole();

/* ==========================================
   4. SKILL BAR ANIMATION (IntersectionObserver)
   ========================================== */
const barFills   = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
barFills.forEach(fill => barObserver.observe(fill));

/* ==========================================
   5. CONTACT FORM VALIDATION
   ========================================== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function showError(id, msg) {
  const el = document.getElementById(id + 'Error');
  if (el) el.textContent = msg;
}
function clearErrors() {
  document.querySelectorAll('.error-msg').forEach(el => (el.textContent = ''));
}

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  clearErrors();

  const fname   = document.getElementById('fname').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if (!fname)              { showError('fname', 'Full name is required.'); valid = false; }
  if (!email)              { showError('email', 'Email is required.'); valid = false; }
  else if (!emailRe.test(email)) { showError('email', 'Please enter a valid email.'); valid = false; }
  if (!message)            { showError('message', 'Message cannot be empty.'); valid = false; }

  if (valid) {
    contactForm.reset();
    formSuccess.style.display = 'block';
    setTimeout(() => (formSuccess.style.display = 'none'), 4500);
  }
});

/* ==========================================
   6. NAVBAR SCROLL ACTIVE HIGHLIGHT
   ========================================== */
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(section => {
    const offset = section.offsetTop - 90;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = (scrollY >= offset && scrollY < offset + height)
        ? 'var(--accent)'
        : '';
    }
  });
});
