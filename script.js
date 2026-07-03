const form = document.getElementById('leadForm');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email = document.getElementById('email').value.trim();
  const vidas = document.getElementById('vidas').value;
  const mensagem = document.getElementById('mensagem').value.trim();
  const texto = `Olá, Gerry! Quero uma cotação de plano de saúde empresarial familiar pelo meu CNPJ.%0A%0ANome: ${encodeURIComponent(nome)}%0AWhatsApp: ${encodeURIComponent(telefone)}%0AE-mail: ${encodeURIComponent(email || 'Não informado')}%0AQuantidade de vidas: ${encodeURIComponent(vidas)}%0AMensagem: ${encodeURIComponent(mensagem || 'Tenho CNPJ e quero incluir minha família no plano.')}`;
  window.open(`https://wa.me/5571981181395?text=${texto}`, '_blank');
});
