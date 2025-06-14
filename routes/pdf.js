const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { exportarInscricoesPDF } = require('../controllers/pdfController');

router.get('/', auth, exportarInscricoesPDF);

module.exports = router;
