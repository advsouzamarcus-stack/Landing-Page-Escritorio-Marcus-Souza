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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function getField(id) {
  return document.getElementById(id);
}

function setLeadTimestamp() {
  const dataEnvio = document.getElementById('dataEnvio');
  if (dataEnvio) {
    dataEnvio.value = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  }
}

function validateLeadForm(form) {
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

  if (valid) setLeadTimestamp();
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

function initAreaTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.area-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
      });
      panels.forEach(panel => {
        const active = panel.id === target;
        panel.classList.toggle('active', active);
        panel.hidden = !active;
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    });
  });
}

function initLeadForm() {
  const form = document.getElementById('leadForm');
  const whatsappInput = document.getElementById('whatsapp');
  const sendLeadWhatsapp = document.getElementById('sendLeadWhatsapp');

  if (whatsappInput) {
    whatsappInput.addEventListener('input', event => {
      event.target.value = formatPhone(event.target.value);
    });
  }

  if (form) {
    form.addEventListener('submit', event => {
      if (!validateLeadForm(form)) {
        event.preventDefault();
        const firstError = form.querySelector('.error:not(:empty)');
        if (firstError) {
          const target = firstError.parentElement?.querySelector('input, select') || firstError.previousElementSibling;
          target?.focus?.();
        }
      }
    });
  }

  if (sendLeadWhatsapp && form) {
    sendLeadWhatsapp.addEventListener('click', () => {
      if (!validateLeadForm(form)) return;
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
  }, { threshold: 0.16 });

  items.forEach(item => observer.observe(item));
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const runCounter = element => {
    const target = Number(element.dataset.counter);
    const duration = 900;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = Math.round(progress * target);
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => observer.observe(counter));
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
initAreaTabs();
initLeadForm();
initRevealAnimations();
initCounters();
initSmartWhatsappLinks();
