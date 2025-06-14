const Inscricao = require('../models/Inscricao');
const MAX_VAGAS = parseInt(process.env.MAX_VAGAS) || 100;

async function calcularVagasRestantes() {
  const confirmadas = await Inscricao.countDocuments({ status: 'confirmada' });
  const restantes = MAX_VAGAS - confirmadas;
  return restantes > 0 ? restantes : 0;
}

module.exports = calcularVagasRestantes;
