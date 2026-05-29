import express from "express";
import cors from "cors";
import { conectarBancoMongo } from "./database/conexao.js";
import Database from "better-sqlite3";
//import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

export { app };

app.get("/", (req, res) => {
    res.send("Endpoints desta API são /api/");
});

try {
    await conectarBancoMongo();

    const db = new Database('banco.db');

    db.exec(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL,
            telefone TEXT,
            tipo TEXT NOT NULL,
            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS fornecedores (
            id_fornecedor INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER NOT NULL,
            nome_loja TEXT NOT NULL,
            descricao TEXT,
            foto_url TEXT,
            contato_email TEXT,
            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (id_usuario)
                REFERENCES usuarios(id_usuario)
        );

        CREATE TABLE IF NOT EXISTS planos (
            id_plano INTEGER PRIMARY KEY AUTOINCREMENT,
            id_fornecedor INTEGER NOT NULL,
            titulo TEXT NOT NULL,
            descricao TEXT,
            preco REAL NOT NULL,
            criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (id_fornecedor)
                REFERENCES fornecedores(id_fornecedor)
        );
    `);

    //const stmt = db.prepare(`
    //    INSERT INTO usuarios (
    //            nome,
    //            email,
    //            senha,
    //            telefone,
    //            tipo
    //        )
    //        VALUES (?, ?, ?, ?, ?)
    //`);
//
    //stmt.run([
    //    'Batata',
    //    'batata123@gmail.com',
    //    '12435',
    //    '149995736942',
    //    'Cliente'
    //]);
//
    //const usuarios = db.prepare(`
    //    SELECT * FROM usuarios
    //`).all();
//
    //console.log(usuarios);

    const porta_API = process.env.PORTA_API;
    app.listen(porta_API || 3000);
    console.log(`Servidor rodando!`);
} catch (erro) {
    console.error("Erro ao conectar ao banco de dados:", erro.message);
}