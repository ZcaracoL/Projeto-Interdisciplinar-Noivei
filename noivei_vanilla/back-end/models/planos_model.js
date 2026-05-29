import mongoose, { Schema } from "mongoose";

export const planoSchema = new Schema({
    titulo: String,
    descricao: String,
    preco: Number,
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

export const Plano = mongoose.model("Plano", planoSchema, "planos");