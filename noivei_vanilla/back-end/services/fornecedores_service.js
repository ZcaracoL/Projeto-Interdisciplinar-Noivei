import { Fornecedor } from "../models/fornecedores_model.js";

export async function criarFornecedor({ nomeLoja, descricao, fotoUrl, contatoEmail, planos }) {
    const fornecedor = new Fornecedor({ nomeLoja, descricao, fotoUrl, contatoEmail, planos });
    return fornecedor.save();
}

export async function listarFornecedores() {
    return await Fornecedro.find({});
}

export async function obterFornecedorPorId(id) {
    return await Fornecedor.find({ _id : id });
}

export async function alterarFornecedor(fornecedorId, { nomeLoja, descricao, fotoUrl, contatoEmail, planos }) {
    return await Fornecedor.findByIdAndUpdate({ _id : fornecedorId },
        { $set : { nomeLoja, descricao, fotoUrl, contatoEmail, planos } },
        { new : true }
    );
}

export async function excluirFornecedor(fornecedorId) {
    return await Fornecedor.findByIdAndDelete({ _id : fornecedorId });
}