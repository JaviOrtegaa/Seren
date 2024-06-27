const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  name: String,
  data: Buffer
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
