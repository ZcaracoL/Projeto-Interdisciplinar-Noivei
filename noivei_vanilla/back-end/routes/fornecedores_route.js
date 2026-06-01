import { Fornecedor } from "../models/fornecedores_model.js"; // Casando com a exportação nomeada do modelo

export function rotasFornecedores(app) {
  
  // 1. ROTA DE LOGIN
  app.post("/api/login", async (req, res) => {
    try {
      const { email, senha } = req.body;
      const fornecedor = await Fornecedor.findOne({ email, senha });

      if (!fornecedor) {
        return res.status(401).json({ erro: "Email ou senha incorretos." });
      }

      return res.json({
        mensagem: "Login realizado com sucesso!",
        id: fornecedor._id,
        nomeLoja: fornecedor.nomeLoja,
        email: fornecedor.email
      });
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao processar o login." });
    }
  });

  // 2. ROTA DE CADASTRO (No lugar certo, onde o 'app' existe!)
  app.post("/api/registrar", async (req, res) => {
    try {
      const { nome, email, senha, telefone } = req.body;

      const usuarioExistente = await Fornecedor.findOne({ email });
      if (usuarioExistente) {
        return res.status(400).json({ erro: "Este e-mail já está sendo usado por outro anunciante." });
      }

      const novoFornecedor = new Fornecedor({
        nomeLoja: nome,
        email: email,
        senha: senha,
        contatoEmail: email,
        imagem: "https://images.unsplash.com/photo-1519741497674-611481863552",
        categoria: "Geral",
        cidade: "Não informada",
        descricao: "Nova loja cadastrada! Edite seu perfil para adicionar detalhes.",
        planos: []
      });

      await novoFornecedor.save();

      return res.status(201).json({
        mensagem: "Fornecedor cadastrado com sucesso!",
        id: novoFornecedor._id
      });

    } catch (error) {
      console.error("Erro no registro:", error);
      return res.status(500).json({ erro: "Erro ao registrar nova loja no banco de dados." });
    }
  });

  // 3. ROTA: ATUALIZAR PERFIL E PLANOS DO FORNECEDOR
  app.put("/api/perfil/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { nomeLoja, descricao, planos, cidade, categoria } = req.body;

      const fornecedorAtualizado = await Fornecedor.findByIdAndUpdate(
        id,
        { nomeLoja, descricao, planos, cidade, categoria },
        { new: true, runValidators: true }
      );

      if (!fornecedorAtualizado) {
        return res.status(404).json({ erro: "Fornecedor não encontrado." });
      }

      return res.json({
        mensagem: "Perfil e planos atualizados com sucesso!",
        fornecedor: fornecedorAtualizado
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao salvar alterações no banco." });
    }
  });

  // 4. LISTAR TODOS
  app.get("/api/lojas", async (req, res) => {
    try {
      const fornecedores = await Fornecedor.find({});
      return res.json(fornecedores);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao buscar fornecedores" });
    }
  });

  // 5. LISTAR APENAS UM POR ID
  app.get("/api/lojas/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const fornecedor = await Fornecedor.findById(id);

      if (!fornecedor) {
        return res.status(404).json({ erro: "Fornecedor não encontrado." });
      }

      return res.json(fornecedor);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao buscar detalhes do fornecedor." });
    }
  });

} // Fecha a função rotasFornecedores