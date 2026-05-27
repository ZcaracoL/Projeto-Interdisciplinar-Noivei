import mongoose, { Schema } from "mongoose";

export const fornecedorSchema = new Schema({
    nomeLoja: String,
    descricao: String,
    fotoUrl: String,
    contatoEmail: String,
    planos: [ String ],
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

export const Fornecedor = mongoose.model("Fornecedor", fornecedorSchema, "fornecedores");