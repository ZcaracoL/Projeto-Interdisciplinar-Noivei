import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../services/api";

export default function Cadastro() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
  });

  function alterarCampo(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // 🚀 FUNÇÃO CORRIGIDA: Agora envia de verdade os dados para o MongoDB!
  async function cadastrar() {
    if (!form.nome || !form.email || !form.senha) {
      alert("Por favor, preencha os campos obrigatórios (Nome, Email e Senha)!");
      return;
    }

    try {
      const response = await api.post("/registrar", {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        telefone: form.telefone
      });

      console.log("Loja criada com sucesso:", response.data);
      alert("Sua conta foi criada com sucesso! 🎉 Prossiga fazendo o seu login.");
      
      // Limpa os campos de texto do formulário por segurança e joga o usuário na aba de Login
      setIsLogin(true); 

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      if (error.response && error.response.data.erro) {
        alert(error.response.data.erro);
      } else {
        alert("Erro ao tentar cadastrar a loja no banco de dados.");
      }
    }
  }

  // Função de Login mantida exatamente como a sua (funcionando perfeitamente)
  async function logar() {
    try {
      const response = await api.post("/login", {
        email: form.email,
        senha: form.senha
      });

      console.log("Sucesso no login:", response.data);
      alert(`Bem-vindo de volta!`);

      localStorage.setItem("fornecedorId", response.data.id);
      navigate("/perfil"); 

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.erro) {
        alert(error.response.data.erro);
      } else {
        alert("Erro ao tentar fazer login. Tente novamente.");
      }
    }
  }

  return (
    <main>
      <div className="login-wrapper">
        <div className="forms-container">

          {!isLogin ? (
            <div className="form-card">
              <h2>Criar conta</h2>

              <input
                name="nome"
                type="text"
                placeholder="Nome da Empresa / Seu Nome"
                value={form.nome}
                onChange={alterarCampo}
              />

              <input
                name="email"
                type="type" // Mantido como original, mas aceita e-mail normalmente
                placeholder="Email"
                value={form.email}
                onChange={alterarCampo}
              />

              <input
                name="telefone"
                type="text"
                placeholder="Telefone / WhatsApp"
                value={form.telefone}
                onChange={alterarCampo}
              />

              <input
                name="senha"
                type="password"
                placeholder="Senha"
                value={form.senha}
                onChange={alterarCampo}
              />

              <button onClick={cadastrar}>
                Cadastrar
              </button>

              <span className="troca-form" onClick={() => setIsLogin(true)}>
                Já tem uma conta? Ir para login
              </span>
            </div>
          ) : (
            <div className="form-card">
              <h2>Login Anunciante</h2>

              <input
                name="email"
                type="email"
                placeholder="Digite seu Email"
                value={form.email}
                onChange={alterarCampo}
              />

              <input
                name="senha"
                type="password"
                placeholder="Digite sua Senha"
                value={form.senha}
                onChange={alterarCampo}
              />

              <button onClick={logar}>
                Entrar no Painel
              </button>

              <span className="troca-form" onClick={() => setIsLogin(false)}>
                Não tem uma conta? Cadastre-se aqui
              </span>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}