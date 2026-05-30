# 👰🤵 Noivei - Projeto Interdisciplinar

O **Noivei** é uma plataforma digital desenvolvida para conectar noivos aos melhores fornecedores de casamento da região (como bandas, fotógrafos, buffets e estilistas). O sistema conta com uma interface rica em React para os noivos explorarem serviços e um painel de controle exclusivo para os anunciantes gerenciarem seus perfis e pacotes de planos, integrando de forma dinâmica o front-end ao banco de dados MongoDB.

---

## 🛠️ Tecnologias Utilizadas

### Front-end
* **React.js** (com Vite)
* **React Router Dom** (Navegação e rotas dinâmicas)
* **Axios** (Consumo de API HTTP)
* **CSS3** (Estilização moderna e responsiva)

### Back-end & Banco de Dados
* **Node.js** com **Express**
* **MongoDB** & **Mongoose** (Modelagem de dados e sub-schemas para planos)
* **ES Modules** (`import/export`)

---

## 📐 Arquitetura do Sistema

O projeto adota uma divisão clara entre a interface do usuário e as regras de negócio:

* **`noivei_vanilla/` (Front-end):** Contém os componentes do React, páginas de listagem (`Lojas.jsx`), formulários integrados de autenticação (`Cadastro.jsx`), e a tela de exibição dinâmica de detalhes do fornecedor com integração direta ao WhatsApp.
* **`back-end/` (Back-end):** Concentra o servidor Express, a conexão com o MongoDB Atlas, os schemas do Mongoose (`fornecedores_model.js`) e as rotas de API (`fornecedores_route.js`) para cadastro, login, listagem e atualização de dados.

---

## 🚀 Como Rodar o Projeto Localmente

Siga os passos abaixo para instalar as dependências e executar o sistema na sua máquina. Você precisará do **Node.js** instalado.

### 1. Configurar e Popular o Back-end
O servidor precisa salvar e buscar as informações no banco de dados.

1. Abra o seu terminal e navegue até a pasta do back-end:
   ```bash
   cd noivei_vanilla/back-end
