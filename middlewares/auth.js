const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ msg: 'Acesso negado. Token ausente.' });

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decodificado.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido.' });
  }
}

module.exports = auth;
