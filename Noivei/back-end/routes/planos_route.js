import { Plano } from "../models/planos_model.js"; // Casando com a exportação nomeada do modelo
import { criarPlano, listarPlanos, obterPlanoPorId, alterarPlano, excluirPlano } from "../services/planos_service.js";

export function rotasPlanos(app) {
  
  app.put("/api/plano/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, descricao, preco } = req.body;

      const planoAtualizado = await Plano.findByIdAndUpdate(
        id,
        { titulo, descricao, preco },
        { new: true, runValidators: true }
      );

      if (!planoAtualizado) {
        return res.status(404).json({ erro: "Plano não encontrado." });
      }

      return res.json({
        mensagem: "Planos atualizados com sucesso!",
        plano: planoAtualizado
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao salvar alterações." });
    }
  });

  app.get("/api/planos", async (req, res) => {
    try {
      const planos = await Plano.find({});
      return res.json(planos);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao buscar planos." });
    }
  });

  app.get("/api/planos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const plano = await Plano.findById(id);

      if (!plano) {
        return res.status(404).json({ erro: "Plano não encontrado." });
      }

      return res.json(plano);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao buscar detalhes do plano." });
    }
  });

  app.delete("/api/planos/:id", async (req, res) => {
    try {
      await excluirPlano(req.params.id);
      return res.json({ "excluido": true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro ao buscar detalhes do fornecedor." });
    }
  });

}