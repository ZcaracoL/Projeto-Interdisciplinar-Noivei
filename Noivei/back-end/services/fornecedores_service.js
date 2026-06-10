import { Fornecedor } from "../models/fornecedores_model.js";
import fs from "fs";

export async function criarFornecedor({ nomeLoja, descricao, fotoUrl, foto, contatoEmail, planos, email, senha }) {
    // tenta usar o arquivo local `logo.png` se existir, caso contrário
    // preserva o valor `foto` recebido (ou omite campo)
    let fotoObj = undefined;
    try {
        if (fs.existsSync("logo.png")) {
            fotoObj = {
                data: fs.readFileSync("logo.png"),
                contentType: "image/png"
            };
        } else if (foto) {
            fotoObj = foto;
        }
    } catch (err) {
        // em caso de erro, não impede a criação do fornecedor
        console.warn("Aviso: não foi possível ler logo.png", err.message);
        if (foto) fotoObj = foto;
    }

    const fornecedor = new Fornecedor({ 
        nomeLoja,
        descricao,
        fotoUrl,
        foto: fotoObj,
        contatoEmail,
        email,
        senha,
        planos
    });

    return fornecedor.save();
}

export async function listarFornecedores() {
    return await Fornecedor.find({}).populate("planos");
}

export async function obterFornecedorPorId(id) {
    return await Fornecedor.find({ _id : id }).populate("planos");
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