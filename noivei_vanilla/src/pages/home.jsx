import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import api from "../services/api"; // Importando sua configuração do Axios
import "./home.css"; 

export default function Home() {
  const [fornecedores, setFornecedores] = useState([]);

  // Buscar os fornecedores do banco de dados quando a página carregar
  useEffect(() => {
    async function carregarFornecedores() {
      try {
        // Consome a rota que configuramos no back-end buscando da coleção de fornecedores
        const response = await api.get("/lojas");
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao carregar fornecedores:", error);
      }
    }
    carregarFornecedores();
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Seção Hero */}
        <section className="hero">
          <aside className="hero-content">
            <h1>
              Bem-Vindo ao <span>Noivei!</span>
            </h1>
            <p>
              O lugar perfeito para noivos encontrarem tudo que precisam para o grande dia.
            </p>
            <div className="botoes">
              <Link to="/lojas" className="primary">
                Explorar Fornecedores
              </Link>
              {/* Direciona para o cadastro/login antes de acessar o perfil */}
              <Link to="/cadastro" className="secondary">
                Página do anunciante
              </Link>
            </div>
          </aside>
        </section>

        {/* Cards de Fornecedores Disponíveis */}
        <section className="lojas-destaque">
          <h2>Conheça nossos Fornecedores Disponíveis</h2>
          
          <div className="cards-container">
            {fornecedores.length === 0 ? (
              <p>Carregando fornecedores...</p>
            ) : (
              fornecedores.map((fornecedor) => (
                <div className="loja-card" key={fornecedor._id}>
                  <div className="loja-imagem">
                    <img src={fornecedor.imagem} alt={fornecedor.nomeLoja} />
                    <span className="loja-categoria">{fornecedor.categoria}</span>
                  </div>
                  <div className="loja-info">
                    <h3>{fornecedor.nomeLoja}</h3>
                    <p className="loja-cidade">📍 {fornecedor.cidade}</p>
                    <p className="loja-descricao">{fornecedor.descricao}</p>
                    
                    {/* Botão que abre a tela dinâmica DetalheLoja passando o ID */}
                    <Link to={`/loja/${fornecedor._id}`} className="btn-ver-mais">
                      Ver Detalhes e Planos
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}