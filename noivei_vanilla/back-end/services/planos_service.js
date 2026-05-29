// planos_service.js
import { Plano } from "../models/planos_model.js";

export async function criarPlano({ titulo, descricao, preco }) {
    const plano = new Plano({
        titulo,
        descricao,
        preco
    });

    return await plano.save();
}

export async function listarPlanos() {
    return await Plano.find({});
}