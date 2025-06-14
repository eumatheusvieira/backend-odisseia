const crypto = require('crypto');
const Inscricao = require('../models/Inscricao');
const enviarEmailConfirmacao = require('../utils/email');

exports.criarInscricao = async (req, res) => {
  const { nome, email, telefone } = req.body;

  try {
    const countConfirmadas = await Inscricao.countDocuments({ status: 'confirmada' });
    if (countConfirmadas >= MAX_VAGAS) {
      return res.status(400).json({ mensagem: 'Vagas esgotadas' });
    }
    
    const token = crypto.randomBytes(20).toString('hex');

    const novaInscricao = await Inscricao.create({
      nome,
      email,
      telefone,
      status: 'pendente',
      tokenConfirmacao: token,
    });

    const urlConfirmacao = `${process.env.FRONTEND_URL}/confirmar/${token}`;

    await enviarEmailConfirmacao(email, nome, urlConfirmacao);

    res.status(201).json({ msg: 'Inscrição criada. Verifique seu email para confirmar.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro ao registrar inscrição.' });
  }
};

exports.listarInscricoes = async (req, res) => {
  try {
    const inscricoes = await Inscricao.find({ status: 'confirmada' }).sort({ data: -1 });
    res.json(inscricoes);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao buscar inscrições.' });
  }
};
