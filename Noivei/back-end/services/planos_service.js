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

export async function obterPlanoPorId(id) {
    return await Plano.find({ _id : id });
}

export async function alterarPlano(planoId, { titulo, descricao, preco }) {
    return await Plano.findByIdAndUpdate({ _id : planoId },
        { $set : { titulo, descricao, preco } },
        { new : true }
    );
}

export async function excluirPlano(planoId) {
    return await Plano.findByIdAndDelete({ _id : planoId });
}