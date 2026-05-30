import express from "express";
import cors from "cors";
import { conectarBancoMongo } from "./database/conexao.js";

// Importa apenas a rota unificada de fornecedores
import { rotasFornecedores } from "./routes/fornecedores_route.js"; 

const app = express();


app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Aceita requisições do seu Front-end
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


rotasFornecedores(app);

app.get("/", (req, res) => {
    res.send("Endpoints desta API são /api/");
});


app.use((err, req, res, next) => {
    console.error("Erro capturado no servidor:", err.stack);
    res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
});

try {
    await conectarBancoMongo();

    const porta_API = process.env.PORTA_API;
    app.listen(porta_API || 3000, () => {
        console.log(`Servidor rodando na porta ${porta_API || 3000}!`);
    });
    
} catch (erro) {
    console.error("Erro ao inicializar a API:", erro.message);
}

export { app };