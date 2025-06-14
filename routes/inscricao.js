const express = require('express');
const router = express.Router();
const { criarInscricao, listarInscricoes } = require('../controllers/inscricaoController');
const auth = require('../middlewares/auth');

// Rota pública para se inscrever
router.post('/', criarInscricao);

// Rota protegida para listar inscritos (painel)
router.get('/', auth, listarInscricoes);

router.get('/vagas', async (req, res) => {
    try {
      const countConfirmadas = await Inscricao.countDocuments({ status: 'confirmada' });
      const vagasRestantes = MAX_VAGAS - countConfirmadas;
      res.json({ vagasRestantes: vagasRestantes > 0 ? vagasRestantes : 0 });
    } catch (error) {
      res.status(500).json({ mensagem: 'Erro no servidor' });
    }
  });
  

module.exports = router;
