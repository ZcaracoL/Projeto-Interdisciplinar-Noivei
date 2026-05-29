import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import api from "../services/api"; // Importando sua configuração do Axios
import "./home.css"; // Certifique-se de ter ou criar este arquivo para os estilos

export default function Home() {
  const [lojas, setLojas] = useState([]);

  // Buscar as lojas do banco de dados quando a página carregar
  useEffect(() => {
    async function carregarLojas() {
      try {
        const response = await api.get("/lojas");
        setLojas(response.data);
      } catch (error) {
        console.error("Erro ao carregar lojas:", error);
      }
    }
    carregarLojas();
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Seção Hero existente */}
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
              <Link to="/perfil" className="secondary">
                Criar Minha Lista
              </Link>
            </div>
          </aside>
        </section>

        {/* NOVA SEÇÃO: Cards de Lojas Disponíveis */}
        <section className="lojas-destaque">
          <h2>Conheça nossas Lojas Disponíveis</h2>
          
          <div className="cards-container">
            {lojas.length === 0 ? (
              <p>Carregando lojas...</p>
            ) : (
              lojas.map((loja) => (
                <div className="loja-card" key={loja._id}>
                  <div className="loja-imagem">
                    <img src={loja.imagem} alt={loja.nomeLoja} />
                    <span className="loja-categoria">{loja.categoria}</span>
                  </div>
                  <div className="loja-info">
                    <h3>{loja.nomeLoja}</h3>
                    <p className="loja-cidade">📍 {loja.cidade}</p>
                    <p className="loja-descricao">{loja.descricao}</p>
                    <Link to={`/loja/${loja._id}`} className="btn-ver-mais">
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