import { conectarBancoMongo } from "./database/conexao.js";
import { Fornecedor } from "./models/fornecedores_model.js";
import mongoose from "mongoose";

async function popularDB() {
  try {
    await conectarBancoMongo();
    
    // Limpa a coleção antiga
    await Fornecedor.deleteMany({});
    console.log("Coleção de fornecedores limpa com sucesso.");

    const dadosIniciais = [
      {
        nomeLoja: "Ateliê Encanto",
        descricao: "Especialistas em vestidos exclusivos.",
        categoria: "Vestidos",
        cidade: "São Paulo",
        imagem: "https://images.unsplash.com/photo-1520854221256-17451cc331bf",
        email: "encanto@noivei.com", // Obrigatório
        senha: "123456",            // Obrigatório
        contatoEmail: "contato@atelieencanto.com",
        planos: [
          { titulo: "Plano Básico", preco: 900, descricao: "Vestido simples com ajustes." },
          { titulo: "Plano Premium", preco: 1800, descricao: "Vestido personalizado." }
        ]
      },
      {
        nomeLoja: "Luz & Memórias",
        descricao: "Fotografia profissional para casamentos.",
        categoria: "Fotografia",
        cidade: "Rio de Janeiro",
        imagem: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
        email: "luz@noivei.com",   // Obrigatório
        senha: "123456",           // Obrigatório
        contatoEmail: "falecom@luzememorias.com",
        planos: [
          { titulo: "Pacote Essencial", preco: 1200, descricao: "Cobertura da cerimônia." },
          { titulo: "Pacote Completo", preco: 2500, descricao: "Drone + álbum digital." }
        ]
      },
      {
        nomeLoja: "Jardim dos Sonhos",
        descricao: "Espaço completo para eventos.",
        categoria: "Salão",
        cidade: "Curitiba",
        imagem: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
        email: "jardim@noivei.com", // Obrigatório
        senha: "123456",            // Obrigatório
        contatoEmail: "reservas@jardimdossonhos.com",
        planos: [
          { titulo: "Evento Mini", preco: 3000, descricao: "Até 80 convidados." },
          { titulo: "Evento Luxo", preco: 6500, descricao: "Decoração premium." }
        ]
      }
    ];

    // Faz a inserção definitiva
    await Fornecedor.insertMany(dadosIniciais);
    console.log("Banco de dados populado com fornecedores e credenciais com sucesso!");

  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
}

popularDB();