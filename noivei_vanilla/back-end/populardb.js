
require("./database/conexao.js");


const Loja = require("./models/Loja");


async function popularDB() {

  try {

    await Loja.deleteMany();

   
    const lojas = [

      {
        nomeLoja: "Ateliê Encanto",

        descricao:
          "Especialistas em vestidos exclusivos.",

        categoria: "Vestidos",

        cidade: "São Paulo",

        imagem:
          "https://images.unsplash.com/photo-1520854221256-17451cc331bf",

        planos: [
          {
            titulo: "Plano Básico",

            preco: "R$ 900",

            descricao:
              "Vestido simples com ajustes.",
          },

          {
            titulo: "Plano Premium",

            preco: "R$ 1800",

            descricao:
              "Vestido personalizado.",
          },
        ],
      },

      {
        nomeLoja: "Luz & Memórias",

        descricao:
          "Fotografia profissional para casamentos.",

        categoria: "Fotografia",

        cidade: "Rio de Janeiro",

        imagem:
          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",

        planos: [
          {
            titulo: "Pacote Essencial",

            preco: "R$ 1200",

            descricao:
              "Cobertura da cerimônia.",
          },

          {
            titulo: "Pacote Completo",

            preco: "R$ 2500",

            descricao:
              "Drone + álbum digital.",
          },
        ],
      },

      {
        nomeLoja: "Jardim dos Sonhos",

        descricao:
          "Espaço completo para eventos.",

        categoria: "Salão",

        cidade: "Curitiba",

        imagem:
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",

        planos: [
          {
            titulo: "Evento Mini",

            preco: "R$ 3000",

            descricao:
              "Até 80 convidados.",
          },

          {
            titulo: "Evento Luxo",

            preco: "R$ 6500",

            descricao:
              "Decoração premium.",
          },
        ],
      },
    ];

    // INSERIR NO BANCO
    await Loja.insertMany(lojas);

    console.log("Banco populado com sucesso!");

  } catch (error) {

    console.log(error);

  } finally {

    process.exit();

  }
}

popularDB();

