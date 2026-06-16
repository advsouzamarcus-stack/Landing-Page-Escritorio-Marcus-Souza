const WHATSAPP_NUMBER = '5521965348183';

function encodeWhatsAppMessage(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function setError(fieldName, message = '') {
  const error = document.querySelector(`[data-error="${fieldName}"]`);
  if (error) error.textContent = message;
}

function getField(id) {
  return document.getElementById(id);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function setHiddenMetadata() {
  const dataEnvio = getField('dataEnvio');
  if (dataEnvio) {
    dataEnvio.value = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  }

  const nextUrl = getField('nextUrl');
  if (nextUrl && window.location.origin && window.location.origin.startsWith('http')) {
    nextUrl.value = `${window.location.origin}/obrigado.html`;
  }
}

function validateLeadForm() {
  let valid = true;
  const nome = getField('nome')?.value.trim() || '';
  const sobrenome = getField('sobrenome')?.value.trim() || '';
  const whatsapp = (getField('whatsapp')?.value || '').replace(/\D/g, '');
  const email = getField('email')?.value.trim() || '';
  const cidade = getField('cidade')?.value.trim() || '';
  const interesse = getField('interesse')?.value || '';
  const consentimento = getField('consentimento')?.checked || false;

  ['nome', 'sobrenome', 'whatsapp', 'email', 'cidade', 'interesse', 'consentimento'].forEach(name => setError(name));

  if (nome.length < 2) {
    setError('nome', 'Informe seu nome.');
    valid = false;
  }

  if (sobrenome.length < 2) {
    setError('sobrenome', 'Informe seu sobrenome.');
    valid = false;
  }

  if (whatsapp.length < 10) {
    setError('whatsapp', 'Informe um WhatsApp válido com DDD.');
    valid = false;
  }

  if (!isValidEmail(email)) {
    setError('email', 'Informe um e-mail válido.');
    valid = false;
  }

  if (cidade.length < 2) {
    setError('cidade', 'Informe sua cidade.');
    valid = false;
  }

  if (!interesse) {
    setError('interesse', 'Selecione o conteúdo desejado.');
    valid = false;
  }

  if (!consentimento) {
    setError('consentimento', 'Autorize o contato para prosseguir.');
    valid = false;
  }

  if (valid) setHiddenMetadata();
  return valid;
}

function leadMessage() {
  return [
    'Olá, Dr. Marcus Souza. Preenchi a Landing Page e quero receber conteúdos jurídicos.',
    '',
    `Nome: ${getField('nome')?.value.trim() || ''} ${getField('sobrenome')?.value.trim() || ''}`,
    `WhatsApp: ${getField('whatsapp')?.value.trim() || ''}`,
    `E-mail: ${getField('email')?.value.trim() || ''}`,
    `Cidade: ${getField('cidade')?.value.trim() || ''}`,
    `Interesse: ${getField('interesse')?.value || ''}`,
    `Data: ${new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}`
  ].join('\n');
}

function initNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initLeadForm() {
  const form = getField('leadForm');
  const whatsappInput = getField('whatsapp');
  const sendLeadWhatsapp = getField('sendLeadWhatsapp');

  if (whatsappInput) {
    whatsappInput.addEventListener('input', event => {
      event.target.value = formatPhone(event.target.value);
    });
  }

  if (form) {
    form.addEventListener('submit', event => {
      if (!validateLeadForm()) {
        event.preventDefault();
        const firstError = form.querySelector('.error:not(:empty)');
        const target = firstError?.previousElementSibling;
        target?.focus?.();
      }
    });
  }

  if (sendLeadWhatsapp) {
    sendLeadWhatsapp.addEventListener('click', () => {
      if (!validateLeadForm()) return;
      window.open(encodeWhatsAppMessage(leadMessage()), '_blank', 'noopener,noreferrer');
    });
  }
}

function initRevealAnimations() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('show'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
}

function initSmartWhatsappLinks() {
  document.querySelectorAll('[data-whatsapp]').forEach(link => {
    link.addEventListener('click', () => {
      try {
        localStorage.setItem('ultimo_clique_whatsapp_marcus_souza', new Date().toISOString());
      } catch (_) {}
    });
  });
}

initNavigation();
initLeadForm();
initRevealAnimations();
initSmartWhatsappLinks();
