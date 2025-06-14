const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const inscricaoRoutes = require('./routes/inscricao');
const confirmacaoRoutes = require('./routes/confirmacao');
const pdfRoutes = require('./routes/pdf');


dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:3000', // durante o desenvolvimento
  process.env.FRONTEND_URL // no ambiente de produção
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite chamadas sem origin (ex: Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Não autorizado pelo CORS'));
    }
  },
  credentials: true // caso use cookies ou autenticação
}));

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/inscricoes', inscricaoRoutes);
app.use('/api/confirmacao', confirmacaoRoutes);
app.use('/api/inscricoes/pdf', pdfRoutes);


app.get('/', (req, res) => {
  res.send('API funcionando!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error('Erro ao conectar MongoDB:', err));
