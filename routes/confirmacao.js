const express = require('express');
const router = express.Router();
const Inscricao = require('../models/Inscricao');

router.get('/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const inscricao = await Inscricao.findOne({ tokenConfirmacao: token, status: 'pendente' });

    if (!inscricao) {
      return res.status(400).json({ msg: 'Token inválido ou inscrição já confirmada.' });
    }

    inscricao.status = 'confirmada';
    inscricao.tokenConfirmacao = undefined;
    await inscricao.save();

    res.json({ msg: 'Inscrição confirmada com sucesso!' });
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao confirmar inscrição.' });
  }
});

module.exports = router;
