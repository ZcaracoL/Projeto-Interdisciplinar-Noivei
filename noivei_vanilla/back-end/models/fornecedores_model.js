import mongoose, { Schema } from "mongoose";

const planoSchema = new Schema({
  titulo: String,
  descricao: String,
  preco: Number,
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

const fornecedorSchema = new Schema({
  nomeLoja: String,
  descricao: String,
  fotoUrl: String,
  contatoEmail: String, // Email público 
  
  // Autenticação para atualização da loja
  email: { type: String, required: true, unique: true }, // Email de acesso
  senha: { type: String, required: true },              
  
  categoria: String,
  cidade: String,
  imagem: String, 
  planos: [planoSchema],
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

// Usando exportação nomeada (mantendo o padrão original)
export const Fornecedor = mongoose.model("Fornecedor", fornecedorSchema, "fornecedores");