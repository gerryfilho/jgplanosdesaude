const form = document.getElementById('leadForm');
const cnpjRadios = document.querySelectorAll('input[name="cnpj"]');
const cnpjSim = document.getElementById('cnpjSim');
const cnpjNao = document.getElementById('cnpjNao');
const submitButton = document.getElementById('submitButton');
const vidas = document.getElementById('vidas');

function updateFormMode() {
  const selected = document.querySelector('input[name="cnpj"]:checked')?.value;
  if (selected === 'Não') {
    cnpjSim.classList.remove('active');
    cnpjNao.classList.add('active');
    submitButton.textContent = 'Verificar Opções Disponíveis';
    vidas.removeAttribute('required');
  } else {
    cnpjSim.classList.add('active');
    cnpjNao.classList.remove('active');
    submitButton.textContent = 'Solicitar Cotação';
    vidas.setAttribute('required', 'required');
  }
}

cnpjRadios.forEach(radio => radio.addEventListener('change', updateFormMode));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email = document.getElementById('email').value.trim();
  const cnpj = document.querySelector('input[name="cnpj"]:checked')?.value || 'Não informado';
  const vidasValor = vidas.value || 'Não informado';
  const mensagem = document.getElementById('mensagem').value.trim();
  const interesse = cnpj === 'Não' ? 'Verificar opções sem CNPJ/MEI ativo' : 'Cotação de plano empresarial familiar pelo CNPJ';
  const texto = `Olá, Gerry! Quero ${interesse}.%0A%0ANome: ${encodeURIComponent(nome)}%0AWhatsApp: ${encodeURIComponent(telefone)}%0AE-mail: ${encodeURIComponent(email || 'Não informado')}%0APossui CNPJ ou MEI ativo: ${encodeURIComponent(cnpj)}%0AQuantidade de pessoas: ${encodeURIComponent(vidasValor)}%0AMensagem: ${encodeURIComponent(mensagem || 'Desejo receber orientação personalizada.')}`;
  window.open(`https://wa.me/5571981181395?text=${texto}`, '_blank');
});
