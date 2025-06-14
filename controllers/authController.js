const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  const { login, senha } = req.body;

  try {
    const admin = await Admin.findOne({ login });
    if (!admin) return res.status(401).json({ msg: 'Credenciais inválidas' });

    const senhaCorreta = await bcrypt.compare(senha, admin.senha);
    if (!senhaCorreta) return res.status(401).json({ msg: 'Credenciais inválidas' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no login' });
  }
};
