// Arquivo para testar conexão com Banco MongoDB, POST, GET e DELETE
import mongoose from "mongoose";

import { conectarBancoMongo } from "./database/conexao.js";

import {
    criarFornecedor,
    listarFornecedores,
    excluirFornecedor
} from "./services/fornecedores_service.js";

import { criarPlano } from "./services/planos_service.js";

async function executarTestes() {

    await conectarBancoMongo();

    const plano1 = await criarPlano({
        titulo: "Plano Básico",
        descricao: "Acesso simples",
        preco: 49.90
    });

    const plano2 = await criarPlano({
        titulo: "Plano Premium",
        descricao: "Acesso completo",
        preco: 99.90
    });

    console.log("=== CRIANDO FORNECEDOR ===");

    const novoFornecedor = await criarFornecedor({
        nomeLoja: "Loja Tech",
        descricao: "Venda de eletrônicos",
        fotoUrl: "https://site.com/foto.png",
        contatoEmail: "contato@lojatech.com",
        // campos de autenticação obrigatórios no modelo
        email: "admin@lojatech.com",
        senha: "senha123",
        // o esquema de fornecedor embute objetos de plano (não refs), então
        // passamos os próprios documentos de plano para embutir
        planos: [
            plano1,
            plano2
        ]
    });

    console.log(novoFornecedor);

    console.log("\n=== LISTANDO FORNECEDORES ===");

    const fornecedores = await listarFornecedores();

    console.log(JSON.stringify(fornecedores, null, 2));

    console.log("\n=== EXCLUINDO FORNECEDOR ===");

    await excluirFornecedor(novoFornecedor._id);

    console.log("Fornecedor removido");

    console.log("\n=== LISTA FINAL ===");

    const listaFinal = await listarFornecedores();

    console.log(listaFinal);

    await mongoose.connection.close();
}

executarTestes();