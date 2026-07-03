document.getElementById('leadForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email = document.getElementById('email').value.trim();
  const perfil = document.getElementById('perfil').value;
  const vidas = document.getElementById('vidas').value;
  const mensagem = document.getElementById('mensagem').value.trim();
  const texto = `Olá, Gerry! Quero cotação de plano de saúde empresarial familiar.%0A%0ANome: ${encodeURIComponent(nome)}%0AWhatsApp: ${encodeURIComponent(telefone)}%0AE-mail: ${encodeURIComponent(email || 'Não informado')}%0APerfil: ${encodeURIComponent(perfil)}%0AQuantidade de vidas: ${encodeURIComponent(vidas)}%0AMensagem: ${encodeURIComponent(mensagem || 'Tenho CNPJ e quero analisar opções para minha família.')}`;
  window.open(`https://wa.me/5571981181395?text=${texto}`, '_blank');
});
