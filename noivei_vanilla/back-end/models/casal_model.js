import mongoose from 'mongoose';

const CasalSchema = new mongoose.Schema({
  nomeNoiva: {
    type: String,
    required: true
  },
  nomeNoivo: {
    type: String,
    required: true
  },
  dataCasamento: {
    type: Date,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  fotoNoiva: {
    type: String,
    required: true
  },
  fotoNoivo: {
    type: String,
    required: true
  },
  fotoCasal: {
    type: String,
    required: true
  },
  ativo: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

export const Casal = mongoose.model('Casal', CasalSchema, 'casais');
