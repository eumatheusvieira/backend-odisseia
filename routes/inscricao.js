const express = require('express');
const router = express.Router();
const { criarInscricao, listarInscricoes } = require('../controllers/inscricaoController');
const auth = require('../middlewares/auth');
const calcularVagasRestantes = require('../utils/vagasRestantes');

// Rota pública para se inscrever
router.post('/', criarInscricao);

// Rota protegida para listar inscritos (painel)
router.get('/', auth, listarInscricoes);

router.get('/vagas', async (req, res) => {
    try {
      const vagasRestantes = await calcularVagasRestantes();
      res.json({ vagasRestantes });
    } catch (err) {
      res.status(500).json({ mensagem: 'Erro ao calcular vagas' });
    }
  });
  

module.exports = router;
