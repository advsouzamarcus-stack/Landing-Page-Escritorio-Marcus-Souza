const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('#menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const leadForm = document.querySelector('.lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', () => {
    const btn = leadForm.querySelector('button[type="submit"]');
    if (btn) btn.textContent = 'Enviando...';
  });
}
