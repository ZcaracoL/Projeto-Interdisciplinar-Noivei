import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import api from "../services/api"; // Configuração do seu Axios
import "./lojas.css"; // Seus estilos específicos da página de listagem

export default function Lojas() {
  const [fornecedores, setFornecedores] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Buscar todos os fornecedores do MongoDB ao carregar a página
  useEffect(() => {
    async function obterFornecedores() {
      try {
        const response = await api.get("/lojas");
        setFornecedores(response.data);
      } catch (error) {
        console.error("Erro ao carregar lista de lojas:", error);
      } finally {
        setCarregando(false);
      }
    }
    obterFornecedores();
  }, []);

  return (
    <>
      <Header />

      <main className="lojas-page" style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px" }}>
        <header className="lojas-header" style={{ marginBottom: "30px", textAlign: "center" }}>
          <h1>Explore Nossos Fornecedores</h1>
          <p style={{ color: "#666" }}>Encontre os melhores profissionais para o seu grande dia</p>
        </header>

        {carregando ? (
          <div style={{ textAlign: "center", padding: "50px", fontSize: "1.2rem" }}>
            Carregando fornecedores...
          </div>
        ) : fornecedores.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <p style={{ color: "#777" }}>Nenhum fornecedor encontrado no momento.</p>
          </div>
        ) : (
          /* Grid de exibição dos Cards */
          <div className="lojas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "30px" }}>
            {fornecedores.map((fornecedor) => (
              <div 
                className="loja-card" 
                key={fornecedor._id} 
                style={{ 
                  background: "white", 
                  borderRadius: "12px", 
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)", 
                  overflow: "hidden", 
                  display: "flex", 
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid #eee"
                }}
              >
                {/* Imagem e Categoria */}
                <div style={{ position: "relative" }}>
                  <img 
                    src={fornecedor.imagem || "https://images.unsplash.com/photo-1519741497674-611481863552"} 
                    alt={fornecedor.nomeLoja} 
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <span 
                    style={{ 
                      position: "absolute", 
                      top: "12px", 
                      left: "12px", 
                      background: "#7c62fc", 
                      color: "white", 
                      padding: "4px 10px", 
                      borderRadius: "20px", 
                      fontSize: "0.75rem", 
                      fontWeight: "bold" 
                    }}
                  >
                    {fornecedor.categoria}
                  </span>
                </div>

                {/* Informações textuais da Loja */}
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ margin: "0 0 8px 0", color: "#333", fontSize: "1.25rem" }}>{fornecedor.nomeLoja}</h3>
                    <p style={{ color: "#777", fontSize: "0.85rem", margin: "0 0 12px 0" }}>📍 {fornecedor.cidade}</p>
                    <p style={{ color: "#555", fontSize: "0.95rem", lineHeight: "1.4", margin: "0 0 20px 0" }}>
                      {fornecedor.descricao}
                    </p>
                  </div>

                  {/* 🚀 BOTÃO ATUALIZADO: Agora é um Link apontando para a página de detalhes dinâmica */}
                  <Link 
                    to={`/loja/${fornecedor._id}`} 
                    className="btn-ver-loja"
                    style={{ 
                      display: "block", 
                      textAlign: "center", 
                      background: "#7c62fc", 
                      color: "white", 
                      padding: "10px 0", 
                      borderRadius: "6px", 
                      textDecoration: "none", 
                      fontWeight: "bold",
                      transition: "background 0.2s"
                    }}
                  >
                    Ver Loja
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}