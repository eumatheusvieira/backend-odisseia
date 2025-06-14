const mongoose = require('mongoose');

const inscricoesSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String },
    status: { type: String, enum: ['pendente', 'confirmada'], default: 'pendente' },
    tokenConfirmacao: { type: String },
    data: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inscricoes', inscricoesSchema);
