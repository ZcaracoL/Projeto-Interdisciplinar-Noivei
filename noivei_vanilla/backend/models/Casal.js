const mongoose = require('mongoose');

function urlValidator(v) {
  if (!v) return false;
  try {
    const u = new URL(v);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

const CasalSchema = new mongoose.Schema({
  nomeNoiva: { type: String, required: true },
  nomeNoivo: { type: String, required: true },
  dataCasamento: { type: Date, required: true },
  descricao: { type: String, required: true },
  fotoNoiva: { type: String, required: true, validate: [urlValidator, 'URL inválida para fotoNoiva'] },
  fotoNoivo: { type: String, required: true, validate: [urlValidator, 'URL inválida para fotoNoivo'] },
  fotoCasal: { type: String, required: true, validate: [urlValidator, 'URL inválida para fotoCasal'] },
  ativo: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Casal', CasalSchema);
