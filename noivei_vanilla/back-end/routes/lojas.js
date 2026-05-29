import express from "express";
import Loja from "../models/Loja.js"; 

export function rotasLojas(app) {
 
  app.get("/api/lojas", async (req, res) => {
    try {
      const lojas = await Loja.find({});
      return res.json(lojas);
    } catch (error) {
      return res.status(500).json({ erro: "Erro ao buscar lojas" });
    }
  });
}