const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // 587 não usa SSL/TLS direto
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function enviarEmailConfirmacao(destinatario, nome, urlConfirmacao) {
  await transporter.sendMail({
    from: `"Peça Odisseia" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: 'Confirmação de Inscrição',
    text: `Olá, ${nome}! Para confirmar sua inscrição, clique no link: ${urlConfirmacao}`,
    html: `<p>Olá, <strong>${nome}</strong>!<br>Para confirmar sua inscrição, clique no link abaixo:<br><a href="${urlConfirmacao}">${urlConfirmacao}</a></p>`,
  });
}

module.exports = enviarEmailConfirmacao;
