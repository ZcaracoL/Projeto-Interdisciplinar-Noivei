const mongoose = require('mongoose');

async function conectarBanco() {
  const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/noivei';
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado ao MongoDB:', URI);
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    throw error;
  }
}

module.exports = { conectarBanco };
