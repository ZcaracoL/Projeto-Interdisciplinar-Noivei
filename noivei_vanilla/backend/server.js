const express = require('express');
const cors = require('cors');
const { conectarBanco } = require('./database/conexao');
const coracoesRoutes = require('./routes/coracoes');

const app = express();

app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

// rotas
app.use('/api', coracoesRoutes);

// rota raiz simples
app.get('/', (req, res) => {
  res.send('Noivei API. Endpoints em /api');
});

const PORT = process.env.PORT || 5000;

conectarBanco()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor backend rodando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error('Falha ao iniciar servidor:', err.message);
  });
