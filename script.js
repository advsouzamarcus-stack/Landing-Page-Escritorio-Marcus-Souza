const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('#mobileMenu');
menuBtn?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded', 'false');
}));

const whatsappBtn = document.querySelector('#sendWhatsApp');
whatsappBtn?.addEventListener('click', () => {
  const form = document.querySelector('.lead-form');
  const data = new FormData(form);
  const nome = data.get('nome') || '';
  const whatsapp = data.get('whatsapp') || '';
  const cidade = data.get('cidade') || '';
  const area = data.get('area') || '';
  const relato = data.get('relato') || '';
  const documentos = data.get('documentos') || '';
  const msg = `Olá, Dr. Marcus. Quero iniciar uma análise jurídica.\n\nNome: ${nome}\nWhatsApp: ${whatsapp}\nCidade: ${cidade}\nÁrea: ${area}\nDocumentos: ${documentos}\nResumo do caso: ${relato}`;
  window.open(`https://wa.me/5521965348183?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});
