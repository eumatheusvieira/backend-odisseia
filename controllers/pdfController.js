const PDFDocument = require('pdfkit');
const Inscricao = require('../models/Inscricao');

exports.exportarInscricoesPDF = async (req, res) => {
  try {
    const inscricoes = await Inscricao.find({ status: 'confirmada' });

    const doc = new PDFDocument();

    // Configura o header do response pra baixar o PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="inscricoes.pdf"');

    doc.pipe(res);

    doc.fontSize(20).text('Inscrições Confirmadas', { align: 'center' });
    doc.moveDown();

    inscricoes.forEach((inscricao, i) => {
      doc
        .fontSize(12)
        .text(`Nome: ${inscricao.nome}`)
        .text(`Email: ${inscricao.email}`)
        .text(`Telefone: ${inscricao.telefone}`)
        .text(`Data: ${new Date(inscricao.data).toLocaleString()}`)
        .moveDown();
    });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao gerar PDF.' });
  }
};
