
# 👰🤵 Noivei - Projeto Interdisciplinar

Projeto fullstack para gerenciar anúncios de lojas/fornecedores com backend em Node.js/Express/MongoDB e frontend em React + Vite.

O **Noivei** é uma plataforma digital desenvolvida para conectar noivos aos melhores fornecedores de casamento da região (como bandas, fotógrafos, buffets e estilistas). O sistema conta com uma interface rica em React para os noivos explorarem serviços e um painel de controle exclusivo para os anunciantes gerenciarem seus perfis e pacotes de planos, integrando de forma dinâmica o front-end ao banco de dados MongoDB.

---

## Visão geral

- `back-end/`: API REST para cadastro, login, atualização de perfil e listagem de lojas.
- `front-end/`: SPA React com rotas para home, cadastro, perfil, lista de lojas e detalhes de loja.

---

## Tecnologias

### Backend
- Node.js
- Express
- MongoDB (mongoose)
- CORS
- dotenv

### Frontend
- React (Vite)
- React Router DOM
- Axios

---

## Estrutura do projeto

- `back-end/`
  - `server.js` - ponto de entrada do servidor Express.
  - `database/conexao.js` - configuração de conexão com MongoDB.
  - `models/fornecedores_model.js` - modelo Mongoose para fornecedores, incluindo planos.
  - `routes/fornecedores_route.js` - rotas principais da API.

- `front-end/`
  - `src/App.jsx` - definição das rotas do React Router.
  - `src/services/api.js` - cliente `axios` configurado para chamar a API.

---

## Configuração

### Backend

1. Entre na pasta do backend:
   ```bash
   cd back-end
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` com as variáveis de ambiente do MongoDB:
   ```env
   DB_USER=<seu_usuario>
   DB_PASSWORD=<sua_senha>
   DB_HOST=<host_do_banco>
   DB_PORT=<porta_do_banco>
   DB_NAME=<nome_do_banco>
   PORTA_API=5000
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

### Frontend

1. Entre na pasta do frontend:
   ```bash
   cd front-end
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o Vite:
   ```bash
   npm run dev
   ```

---

## Uso

### Rotas do backend

- `POST /api/login`
  - Corpo: `{ email, senha }`
  - Retorna dados de login e ID do fornecedor.

- `POST /api/registrar`
  - Corpo: `{ nome, email, senha, telefone }`
  - Cria um novo fornecedor.

- `PUT /api/perfil/:id`
  - Atualiza `nomeLoja`, `descricao`, `planos`, `cidade`, `categoria` do fornecedor.

- `GET /api/lojas`
  - Retorna todas as lojas/fornecedores.

- `GET /api/lojas/:id`
  - Retorna os dados de uma loja específica.

### Rotas do frontend

- `/` - Home
- `/cadastro` - Cadastro de novo fornecedor
- `/perfil` - Tela de perfil e edição
- `/lojas` - Lista de lojas
- `/loja/:id` - Detalhe da loja selecionada

---

## Observações

- A API backend está configurada para aceitar requisições do frontend em `http://localhost:5173`.
- O frontend usa `http://localhost:5000/api` como base para chamadas de API.
- Se precisar ajustar a porta do backend, atualize a variável `PORTA_API` no `.env` e o `baseURL` em `front-end/src/services/api.js`.

---