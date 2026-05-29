import { useState } from "react";

export default function Cadastro() {
  const [isLogin, setIsLogin] = useState(false);

  const [tipoUsuario, setTipoUsuario] = useState("cliente");

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

  function cadastrar() {
    console.log(form);
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
                placeholder="Nome"
                onChange={alterarCampo}
              />

              <input
                name="email"
                placeholder="Email"
                onChange={alterarCampo}
              />

              <button onClick={cadastrar}>
                Cadastrar
              </button>

              <span onClick={() => setIsLogin(true)}>
                Ir para login
              </span>
            </div>
          ) : (
            <div className="form-card">
              <h2>Login</h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}