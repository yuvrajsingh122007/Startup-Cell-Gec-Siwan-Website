/* ── Scroll Reveal ── */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

/* ── Character Counter ── */
const descTA = document.getElementById('desc');
const charCount = document.getElementById('charCount');
descTA.addEventListener('input', () => {
  charCount.textContent = descTA.value.length;
  charCount.style.color = descTA.value.length > 900 ? '#f43f5e' : '';
});

/* ── Toast System ── */
function showToast(type, title, message) {
  const wrap = document.getElementById('toastWrap');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon ${type}">
      <i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i>
    </div>
    <div class="toast-body">
      <h6>${title}</h6>
      <p>${message}</p>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i class="fa-solid fa-xmark"></i>
    </button>`;
  wrap.appendChild(toast);
  requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 500); }, 5000);
}

/* ── Form Validation & Submit ── */
const form = document.getElementById('ideaForm');
const submitBtn = document.getElementById('submitBtn');

function validateField(input) {
  const ok = input.value.trim() !== '' && (input.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value));
  input.style.borderColor = ok ? '' : 'rgba(244,63,94,0.6)';
  input.style.boxShadow = ok ? '' : '0 0 0 4px rgba(244,63,94,0.1)';
  return ok;
}

/* Live validation */
form.querySelectorAll('input, textarea').forEach(inp => {
  inp.addEventListener('blur', () => inp.value && validateField(inp));
  inp.addEventListener('input', () => inp.style.borderColor = '');
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const required = ['name', 'branch', 'semester', 'regNo', 'email', 'phone', 'topic', 'desc'];
  let valid = true;
  required.forEach(id => { if (!validateField(document.getElementById(id))) valid = false; });

  if (!valid) {
    showToast('error', 'Incomplete Form', 'Please fill in all required fields correctly.');
    return;
  }

  /* Simulate submission */
  submitBtn.classList.add('loading');
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting…';

  setTimeout(() => {
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit My Idea';
    form.reset();
    charCount.textContent = '0';
    showToast('success', 'Idea Submitted! 🚀', 'We\'ll review your submission and get back within 5–7 days.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1800);
});
