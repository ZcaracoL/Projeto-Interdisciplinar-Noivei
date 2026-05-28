import express from "express";
import cors from "cors";
import { conectarBancoMongo } from "./database/conexao.js";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

export { app };

app.get("/", (req, res) => {
    res.send("Endpoints desta API são /api/fornecedores");
});

try {
    await conectarBancoMongo();
    const porta_API = process.env.PORTA_API;
    app.listen(porta_API);
    console.log(`Servidor rodando na porta ${porta_API}`);
} catch (erro) {
    console.error("Erro ao conectar ao banco de dados:", erro.message);
}