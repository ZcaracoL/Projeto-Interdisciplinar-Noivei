const express = require('express');
const router = express.Router();
const Casal = require('../models/Casal');

// rota de teste: /api/teste (note: o servidor pode montar esse router em /api)
router.get('/teste', (req, res) => {
  res.json({ ok: true, message: 'API backend funcionando' });
});

// listar casais ativos
router.get('/coracoes/casais', async (req, res) => {
  try {
    const casais = await Casal.find({ ativo: true }).sort({ createdAt: -1 });
    res.json(casais);
  } catch (error) {
    console.error('Erro listar casais:', error);
    res.status(500).json({ error: 'Erro ao buscar casais' });
  }
});

// criar novo casal
router.post('/coracoes/casais', async (req, res) => {
  try {
    const novoCasal = new Casal(req.body);
    await novoCasal.save();
    res.status(201).json(novoCasal);
  } catch (error) {
    console.error('Erro ao criar casal:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Erro interno ao criar casal' });
  }
});

// atualizar casal
router.put('/coracoes/casais/:id', async (req, res) => {
  try {
    const casal = await Casal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!casal) return res.status(404).json({ error: 'Casal não encontrado' });
    res.json(casal);
  } catch (error) {
    console.error('Erro ao atualizar casal:', error);
    res.status(400).json({ error: error.message });
  }
});

// desativar casal
router.delete('/coracoes/casais/:id', async (req, res) => {
  try {
    await Casal.findByIdAndUpdate(req.params.id, { ativo: false }, { new: true });
    res.json({ message: 'Casal desativado com sucesso' });
  } catch (error) {
    console.error('Erro ao desativar casal:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
