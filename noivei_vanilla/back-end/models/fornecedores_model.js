import mongoose, { Schema } from "mongoose";
import { planoSchema } from "./planos_model.js";

export const fornecedorSchema = new Schema({
    nomeLoja: String,
    descricao: String,
    fotoUrl: String,
    contatoEmail: String,
    planos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Plano"
        }
    ],
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

export const Fornecedor = mongoose.model("Fornecedor", fornecedorSchema, "fornecedores");