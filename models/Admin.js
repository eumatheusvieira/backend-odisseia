const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
});

module.exports = mongoose.model('Admin', adminSchema);
