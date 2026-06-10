import { Casal } from '../models/casais_model.js';

export function rotasCoracoes(app) {

  app.get('/api/teste', (req, res) => {
    return res.json({ ok: true, message: 'API backend funcionando' });
  });

  // GET - Buscar todos os casais ativos
  app.get('/api/coracoes/casais', async (req, res) => {
    try {
      const casais = await Casal.find({ ativo: true }).sort({ createdAt: -1 });
      return res.json(casais);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  // POST - Criar novo casal
  app.post('/api/coracoes/casais', async (req, res) => {
    try {
      console.log('POST /api/coracoes/casais body:', req.body);
      const novoCasal = new Casal(req.body);
      await novoCasal.save();
      return res.status(201).json(novoCasal);
    } catch (error) {
      console.error('Erro ao criar casal:', error);
      return res.status(400).json({ error: error.message });
    }
  });

  // PUT - Atualizar casal
  app.put('/api/coracoes/casais/:id', async (req, res) => {
    try {
      const casal = await Casal.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(casal);
    } catch (error) {
      console.error('Erro ao atualizar casal:', error);
      return res.status(400).json({ error: error.message });
    }
  });

  // DELETE - Desativar casal
  app.delete('/api/coracoes/casais/:id', async (req, res) => {
    try {
      await Casal.findByIdAndUpdate(req.params.id, { ativo: false }, { new: true });
      return res.json({ message: 'Casal desativado com sucesso' });
    } catch (error) {
      console.error('Erro ao desativar casal:', error);
      return res.status(400).json({ error: error.message });
    }
  });

} // rotasCoracoes
