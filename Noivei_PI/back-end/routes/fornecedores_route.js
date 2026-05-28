import { criarFornecedor, listarFornecedores, alterarFornecedor, excluirFornecedor, obterFornecedorPorId } from "../services/fornecedores_service.js";

export function rotasFornecedores(app) {
    // GET
    app.get("/api/fornecedores", async (req, res) => {
        return res.json(await listarFornecedores());
    });

    // GET po ID
    app.get("/api/fornecedores/:id", async (req, res) => {
        return res.json(await obterFornecedorPorId(req.params.id));
    });

    // POST
    app.post("/api/fornecedores", async (req, res) => {
        const forenecedorIncluido = await criarFornecedor(req.body);
        return res.stauts(201).json(forenecedorIncluido);
    });

    // PATCH
    app.patch("/api/fornecedores/:id", async (req, res ) => {
        const fornecedorAlterado = await alterarFornecedor(req.params.id, req.body);
        if (fornecedorAlterado) {
            return res.json(fornecedorAlterado);
        } else {
            return res.status(500).json({ "erro": "falha na alteração" });
        }
    });

    // DELETE
    app.delete("/api/fornecedores/:id", async (req, res) => {
        await excluirFornecedor(req.params.id);
        return res.json({ "excluido": true });
    });
}