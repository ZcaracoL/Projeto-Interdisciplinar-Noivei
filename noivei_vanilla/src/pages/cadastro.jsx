import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../services/api";
import "./cadastro.css"; 

export default function Cadastro() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
  });

  // Novos states para loading e erro
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function alterarCampo(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // Limpa mensagens quando o usuário começa a digitar
    setErrorMessage("");
    setSuccessMessage("");
  }

  // 🚀 FUNÇÃO CORRIGIDA: Agora envia de verdade os dados para o MongoDB!
  async function cadastrar() {
    if (!form.nome || !form.email || !form.senha) {
      alert("Por favor, preencha os campos obrigatórios (Nome, Email e Senha)!");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await api.post("/registrar", {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        telefone: form.telefone
      });

      console.log("Loja criada com sucesso:", response.data);
      setSuccessMessage("Sua conta foi criada com sucesso! 🎉 Prossiga fazendo o seu login.");
      
      // Limpa os campos de texto do formulário por segurança e joga o usuário na aba de Login
      setTimeout(() => {
        setIsLogin(true);
        setForm({
          nome: "",
          email: "",
          senha: "",
          telefone: "",
        });
        setSuccessMessage("");
      }, 2000);

    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      if (error.response && error.response.data.erro) {
        setErrorMessage(error.response.data.erro);
      } else {
        setErrorMessage("Erro ao tentar cadastrar a loja no banco de dados.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Função de Login mantida exatamente como a sua (funcionando perfeitamente)
  async function logar() {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await api.post("/login", {
        email: form.email,
        senha: form.senha
      });

      console.log("Sucesso no login:", response.data);
      setSuccessMessage(`Bem-vindo de volta! Redirecionando...`);

      localStorage.setItem("fornecedorId", response.data.id);
      
      setTimeout(() => {
        navigate("/perfil");
      }, 1500);

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.erro) {
        setErrorMessage(error.response.data.erro);
      } else {
        setErrorMessage("Erro ao tentar fazer login. Tente novamente.");
      }
      setIsLoading(false);
    }
  }

  return (
    <main>
      <div className="login-wrapper">
        <div className="forms-container">

          {!isLogin ? (
            <div className="form-card">
              <h2>Criar conta</h2>

              {/* Mensagens de feedback */}
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
              
              {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}

              <input
                name="nome"
                type="text"
                placeholder="Nome da Empresa / Seu Nome"
                value={form.nome}
                onChange={alterarCampo}
                disabled={isLoading}
              />

              <input
                name="email"
                type="type" // Mantido como original, mas aceita e-mail normalmente
                placeholder="Email"
                value={form.email}
                onChange={alterarCampo}
                disabled={isLoading}
              />

              <input
                name="telefone"
                type="text"
                placeholder="Telefone / WhatsApp"
                value={form.telefone}
                onChange={alterarCampo}
                disabled={isLoading}
              />

              <input
                name="senha"
                type="password"
                placeholder="Senha"
                value={form.senha}
                onChange={alterarCampo}
                disabled={isLoading}
              />

              <button onClick={cadastrar} disabled={isLoading} className={isLoading ? "loading" : ""}>
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </button>

              <span className="troca-form" onClick={() => !isLoading && setIsLogin(true)}>
                Já tem uma conta? Ir para login
              </span>
            </div>
          ) : (
            <div className="form-card">
              <h2>Login Anunciante</h2>

              {/* Mensagens de feedback */}
              {errorMessage && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}
              
              {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}

              <input
                name="email"
                type="email"
                placeholder="Digite seu Email"
                value={form.email}
                onChange={alterarCampo}
                disabled={isLoading}
              />

              <input
                name="senha"
                type="password"
                placeholder="Digite sua Senha"
                value={form.senha}
                onChange={alterarCampo}
                disabled={isLoading}
              />

              <button onClick={logar} disabled={isLoading} className={isLoading ? "loading" : ""}>
                {isLoading ? "Entrando..." : "Entrar no Painel"}
              </button>

              <span className="troca-form" onClick={() => !isLoading && setIsLogin(false)}>
                Não tem uma conta? Cadastre-se aqui
              </span>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}