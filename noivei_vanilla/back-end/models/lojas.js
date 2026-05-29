
const mongoose = require("mongoose");

const planoSchema = new mongoose.Schema({
  titulo: String,
  preco: String,
  descricao: String,
});

const lojaSchema = new mongoose.Schema({

  nomeLoja: String,

  descricao: String,

  categoria: String,

  cidade: String,

  imagem: String,

  planos: [planoSchema],
});

module.exports = mongoose.model(
  "Loja",
  lojaSchema
);
