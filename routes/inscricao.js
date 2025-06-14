const express = require('express');
const router = express.Router();
const { criarInscricao, listarInscricoes } = require('../controllers/inscricaoController');
const auth = require('../middlewares/auth');

// Rota pública para se inscrever
router.post('/', criarInscricao);

// Rota protegida para listar inscritos (painel)
router.get('/', auth, listarInscricoes);

module.exports = router;
