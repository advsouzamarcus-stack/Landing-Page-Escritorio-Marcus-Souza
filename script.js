const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const params = new URLSearchParams(window.location.search);
const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
utmFields.forEach(field => {
  const input = document.getElementById(field);
  if (input) input.value = params.get(field) || '';
});

try {
  const visit = {
    page: window.location.pathname,
    source: params.get('utm_source') || 'direct',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
    createdAt: new Date().toISOString()
  };
  localStorage.setItem('souza_last_visit', JSON.stringify(visit));
} catch (error) {
  console.warn('Não foi possível salvar a origem da visita.', error);
}

window.dataLayer = window.dataLayer || [];

document.querySelectorAll('[data-area]').forEach(link => {
  link.addEventListener('click', () => {
    window.dataLayer.push({
      event: 'lead_whatsapp',
      area: link.getAttribute('data-area') || 'Geral',
      page: window.location.pathname
    });
  });
});

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', () => {
    window.dataLayer.push({
      event: 'lead_form_submit',
      form_name: form.getAttribute('name') || 'lead',
      page: window.location.pathname
    });
  });
});
