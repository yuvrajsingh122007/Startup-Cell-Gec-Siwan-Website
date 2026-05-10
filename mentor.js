/* ── Mentor Data ── */
const mentors = [
  { name:"Aryan Kumar", role:"Senior Web Developer · TechCorp", photo:"https://randomuser.me/api/portraits/men/32.jpg",
    bio:"Aryan is a full-stack developer with 5 years of industry experience building scalable web applications. He has worked with multiple early-stage startups and is passionate about mentoring college students.", skills:["React","Node.js","Firebase","MongoDB","Startup Pitching"],
    achieve:"Led development of 3 startup products that reached 50K+ users. Speaker at TechFest 2023.", stats:[{n:"120+",l:"Students Mentored"},{n:"18",l:"Startups Guided"},{n:"4.9★",l:"Rating"}] },
  { name:"Priya Sharma", role:"AI/ML Engineer · DeepMind India", photo:"https://randomuser.me/api/portraits/women/44.jpg",
    bio:"Priya specializes in machine learning and AI deployment. She has worked on healthcare AI products and loves helping students bridge theory and real-world application.", skills:["Python","TensorFlow","Keras","NLP","ML Ops"],
    achieve:"Published 2 research papers. Contributed to open-source ML frameworks used by 10K+ developers.", stats:[{n:"80+",l:"Students Mentored"},{n:"12",l:"Projects Guided"},{n:"4.8★",l:"Rating"}] },
  { name:"Rahul Verma", role:"Startup Coach · 3x Founder", photo:"https://randomuser.me/api/portraits/men/58.jpg",
    bio:"Rahul has built and exited 3 startups across EdTech and FinTech. He now coaches college founders on pitching, fundraising, and building products people actually want.", skills:["Fundraising","Pitching","Product-Market Fit","GTM Strategy","Business Models"],
    achieve:"Raised $2M+ across ventures. Mentored startups that went on to win national hackathons.", stats:[{n:"200+",l:"Students Mentored"},{n:"30+",l:"Startups Guided"},{n:"5.0★",l:"Rating"}] },
  { name:"Sneha Patel", role:"Lead UI/UX Designer · Figma", photo:"https://randomuser.me/api/portraits/women/61.jpg",
    bio:"Sneha is a design thinking advocate with 7 years of experience improving user experiences for startups and enterprises. She helped 20+ startups increase user retention through smart UX.", skills:["Figma","Prototyping","User Research","Design Systems","Accessibility"],
    achieve:"Redesigned onboarding flows that boosted conversion by 3x. Winner of UX Awards 2022.", stats:[{n:"90+",l:"Students Mentored"},{n:"20+",l:"Designs Reviewed"},{n:"4.9★",l:"Rating"}] },
  { name:"Vikram Singh", role:"App Developer · Google", photo:"https://randomuser.me/api/portraits/men/77.jpg",
    bio:"Vikram builds cross-platform apps with Flutter and React Native. His apps have been downloaded 1M+ times. He enjoys breaking down complex concepts for student developers.", skills:["Flutter","React Native","Firebase","REST APIs","Play Store"],
    achieve:"Built app with 1M+ downloads. Google Developer Expert 2023.", stats:[{n:"110+",l:"Students Mentored"},{n:"15+",l:"Apps Built Together"},{n:"4.7★",l:"Rating"}] },
  { name:"Aisha Khan", role:"Growth Marketer · StartupX", photo:"https://randomuser.me/api/portraits/women/29.jpg",
    bio:"Aisha grew multiple EdTech startups from zero to 100K users using digital marketing and brand strategy. She specializes in helping founders build audiences before products.", skills:["SEO","Content Marketing","Growth Hacking","Brand Building","Analytics"],
    achieve:"Grew 3 startups to 100K+ users. Featured in Forbes India 30 Under 30.", stats:[{n:"70+",l:"Students Mentored"},{n:"10+",l:"Brands Built"},{n:"4.8★",l:"Rating"}] }
];

/* ── Navbar scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Scroll Reveal ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold:0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ── Animated Counters ── */
function animateCounter(el, target, suffix='') {
  let start = 0; const dur = 1800;
  const step = timestamp => {
    if(!start) start = timestamp;
    const pct = Math.min((timestamp - start) / dur, 1);
    el.textContent = Math.floor(pct * target) + (pct === 1 ? suffix : '+');
    if(pct < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const t = parseInt(e.target.dataset.target);
      animateCounter(e.target, t, '+');
      counterIO.unobserve(e.target);
    }
  });
}, { threshold:0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterIO.observe(el));

/* ── Category Filter ── */
document.querySelectorAll('.cat-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const cat = chip.dataset.cat;
    document.querySelectorAll('.mentor-card').forEach(card => {
      const cats = card.dataset.cat || '';
      card.style.display = (cat === 'all' || cats.includes(cat)) ? '' : 'none';
    });
  });
});

/* ── Mentor Popup ── */
const overlay = document.getElementById('popupOverlay');
document.querySelectorAll('.open-popup').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const m = mentors[btn.dataset.mentor];
    document.getElementById('pp-photo').src = m.photo;
    document.getElementById('pp-name').textContent = m.name;
    document.getElementById('pp-role').textContent = m.role;
    document.getElementById('pp-bio').textContent = m.bio;
    document.getElementById('pp-achieve').textContent = m.achieve;
    document.getElementById('pp-badges').innerHTML = m.skills.slice(0,3).map(s=>`<span class="popup-badge">${s}</span>`).join('');
    document.getElementById('pp-skills').innerHTML = m.skills.map(s=>`<span class="skill-tag">${s}</span>`).join('');
    document.getElementById('pp-stats').innerHTML = m.stats.map(s=>`<div class="popup-stat"><strong>${s.n}</strong><span>${s.l}</span></div>`).join('');
    document.getElementById('pp-links').innerHTML =
      `<a href="#" class="popup-link li"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
       <a href="#" class="popup-link gh"><i class="fa-brands fa-github"></i> GitHub</a>`;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});
document.getElementById('popupClose').addEventListener('click', closePopup);
overlay.addEventListener('click', e => { if(e.target === overlay) closePopup(); });
function closePopup() { overlay.classList.remove('open'); document.body.style.overflow = ''; }
document.addEventListener('keydown', e => { if(e.key === 'Escape') closePopup(); });

/* ── AI Mentor Suggestion ── */
const keywordMap = {
  react:0, node:0, web:0, firebase:0, javascript:0, html:0, css:0,
  python:1, ml:1, ai:1, machine:1, model:1, tensorflow:1,
  startup:2, pitch:2, fund:2, business:2, investor:2,
  design:3, ui:3, ux:3, figma:3, prototype:3,
  app:4, flutter:4, mobile:4, android:4, ios:4,
  marketing:5, seo:5, brand:5, growth:5, social:5
};
document.getElementById('pDesc').addEventListener('input', function() {
  const words = this.value.toLowerCase().split(/\s+/);
  const scores = Array(6).fill(0);
  words.forEach(w => { if(keywordMap[w] !== undefined) scores[keywordMap[w]]++; });
  const suggested = scores.map((s,i)=>({s,i})).filter(x=>x.s>0).sort((a,b)=>b.s-a.s).slice(0,2);
  const box = document.getElementById('suggestBox');
  const list = document.getElementById('suggestList');
  if(suggested.length) {
    box.classList.add('show');
    list.innerHTML = suggested.map(x => {
      const m = mentors[x.i];
      return `<div class="suggest-mentor" onclick="document.getElementById('pMentor').value='${m.name.split(' ')[0]} ${m.name.split(' ')[1]} (${m.role.split(' ')[0]})'">
        <img src="${m.photo}" class="suggest-avatar"/><div class="suggest-info"><span>${m.name}</span><small>${m.role}</small></div>
        <i class="fa-solid fa-arrow-right" style="margin-left:auto;color:var(--accent);font-size:12px"></i>
      </div>`;
    }).join('');
  } else { box.classList.remove('show'); }
});

/* ── FAQ Accordion ── */
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if(!isOpen) item.classList.add('open');
  });
});


/* ── Toast ── */
function showToast(type, title, msg) {
  const wrap = document.getElementById('toastWrap');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<div class="t-icon ${type}"><i class="fa-solid fa-${type==='s'?'circle-check':'circle-exclamation'}"></i></div>
    <div class="t-body"><h6>${title}</h6><p>${msg}</p></div>
    <button class="t-close" onclick="this.parentElement.remove()"><i class="fa-solid fa-xmark"></i></button>`;
  wrap.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, 5000);
}

/* ── Form Submit ── */
document.getElementById('problemForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const req = ['pName','pEmail','pDept','pYear','pCat','pDesc'];
  let ok = true;
  req.forEach(id => {
    const el = document.getElementById(id);
    if(!el.value.trim()) { el.style.borderColor='rgba(244,63,94,.6)'; el.style.boxShadow='0 0 0 4px rgba(244,63,94,.1)'; ok=false; }
    else { el.style.borderColor=''; el.style.boxShadow=''; }
  });
  if(!ok) { showToast('e','Incomplete Form','Please fill all required fields.'); return; }
  const btn = document.getElementById('submitBtn');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting…';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    this.reset(); document.getElementById('suggestBox').classList.remove('show');
    btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Problem';
    btn.style.pointerEvents = '';
    showToast('s','Problem Submitted! 🎉','We\'ll match you with a mentor within 24–48 hours.');
    window.scrollTo({top:0,behavior:'smooth'});
  }, 1800);
});
