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

function validateLeadForm(form) {
  let valid = true;
  const nome = form.nome.value.trim();
  const whatsapp = form.whatsapp.value.replace(/\D/g, '');
  const email = form.email.value.trim();
  const cidade = form.cidade.value.trim();
  const interesse = form.interesse.value;
  const consentimento = form.consentimento.checked;

  ['nome', 'whatsapp', 'email', 'cidade', 'interesse', 'consentimento'].forEach(name => setError(name));

  if (nome.length < 3 || !nome.includes(' ')) {
    setError('nome', 'Informe nome e sobrenome.');
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
    setError('interesse', 'Selecione o principal interesse.');
    valid = false;
  }

  if (!consentimento) {
    setError('consentimento', 'Autorize o contato para prosseguir.');
    valid = false;
  }

  return valid;
}

function leadMessage(form) {
  return [
    'Olá, Dr. Marcus Souza. Preenchi a Landing Page e quero receber conteúdos jurídicos.',
    '',
    `Nome: ${form.nome.value.trim()}`,
    `WhatsApp: ${form.whatsapp.value.trim()}`,
    `E-mail: ${form.email.value.trim()}`,
    `Cidade: ${form.cidade.value.trim()}`,
    `Interesse: ${form.interesse.value}`
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
        if (firstError) firstError.previousElementSibling?.focus?.();
      }
    });
  }

  if (sendLeadWhatsapp && form) {
    sendLeadWhatsapp.addEventListener('click', () => {
      if (!validateLeadForm(form)) return;
      window.open(encodeWhatsAppMessage(leadMessage(form)), '_blank', 'noopener,noreferrer');
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
