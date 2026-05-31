import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import api from "../services/api";
import "./lojas.css";

export default function Lojas() {
  const [fornecedores, setFornecedores] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [termoBusca, setTermoBusca] = useState("");
  const itensPorPagina = 12;

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

  // Filtrar fornecedores baseado no termo de busca
  const fornecedoresFiltrados = fornecedores.filter(fornecedor => {
    if (!termoBusca) return true;
    
    const termo = termoBusca.toLowerCase().trim();
    return (
      fornecedor.nomeLoja?.toLowerCase().includes(termo) ||
      fornecedor.categoria?.toLowerCase().includes(termo) ||
      fornecedor.cidade?.toLowerCase().includes(termo) ||
      fornecedor.descricao?.toLowerCase().includes(termo)
    );
  });

  const ultimoIndex = paginaAtual * itensPorPagina;
  const primeiroIndex = ultimoIndex - itensPorPagina;
  const fornecedoresAtuais = fornecedoresFiltrados.slice(primeiroIndex, ultimoIndex);
  const totalPaginas = Math.ceil(fornecedoresFiltrados.length / itensPorPagina);

  const irParaPagina = (numero) => {
    setPaginaAtual(numero);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBusca = (e) => {
    setTermoBusca(e.target.value);
    setPaginaAtual(1); // Resetar para primeira página ao buscar
  };

  const limparBusca = () => {
    setTermoBusca("");
    setPaginaAtual(1);
  };

  return (
    <>
      <Header />
      
      <div className="pagina-lojas">
        <div className="container-lojas">
          <div className="hero-lojas">
            <h1>Explore nossos fornecedores</h1>
            <p>Encontre os melhores profissionais para o seu grande dia!</p>
          </div>

          {/* Barra de Pesquisa */}
          <div className="barra-pesquisa-container">
            <div className="barra-pesquisa">
              <div className="pesquisa-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Busque por nome da loja, categoria, cidade..."
                value={termoBusca}
                onChange={handleBusca}
                className="pesquisa-input"
              />
              {termoBusca && (
                <button onClick={limparBusca} className="limpar-busca">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Resultados da busca */}
          {!carregando && termoBusca && (
            <div className="resultados-busca">
              <p>
                🔍 Encontramos <strong>{fornecedoresFiltrados.length}</strong> resultado(s) para "<strong>{termoBusca}</strong>"
              </p>
            </div>
          )}

          {carregando ? (
            <div className="carregando">Carregando fornecedores...</div>
          ) : fornecedoresFiltrados.length === 0 ? (
            <div className="vazio">
              <p>😕 Nenhum fornecedor encontrado para "{termoBusca}"</p>
              <button onClick={limparBusca} className="botao-secundario">
                Limpar busca
              </button>
            </div>
          ) : (
            <>
              <div className="grid-lojas">
                {fornecedoresAtuais.map((fornecedor, index) => (
                  <div className="card" key={fornecedor._id} style={{ '--index': index + 1 }}>
                    <div className="card-img">
                      <img 
                        src={fornecedor.imagem || "https://images.unsplash.com/photo-1519741497674-611481863552"} 
                        alt={fornecedor.nomeLoja}
                      />
                      <span className="categoria">{fornecedor.categoria}</span>
                    </div>
                    <div className="card-conteudo">
                      <h3>{fornecedor.nomeLoja}</h3>
                      <p className="cidade">📍 {fornecedor.cidade || "Localização não informada"}</p>
                      <p className="descricao">{fornecedor.descricao || "Sem descrição disponível"}</p>
                      <Link to={`/loja/${fornecedor._id}`} className="botao">
                        Ver Loja
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {totalPaginas > 1 && (
                <div className="paginacao">
                  <button onClick={() => irParaPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
                    ◀ Anterior
                  </button>
                  
                  <div className="paginas-numeros">
                    {[...Array(totalPaginas)].map((_, i) => {
                      if (
                        i + 1 === 1 ||
                        i + 1 === totalPaginas ||
                        (i + 1 >= paginaAtual - 1 && i + 1 <= paginaAtual + 1)
                      ) {
                        return (
                          <button
                            key={i}
                            onClick={() => irParaPagina(i + 1)}
                            className={paginaAtual === i + 1 ? "ativo" : ""}
                          >
                            {i + 1}
                          </button>
                        );
                      }
                      if (
                        (i + 1 === paginaAtual - 2 && paginaAtual > 3) ||
                        (i + 1 === paginaAtual + 2 && paginaAtual < totalPaginas - 2)
                      ) {
                        return <span key={i} className="pontos">...</span>;
                      }
                      return null;
                    })}
                  </div>
                  
                  <button onClick={() => irParaPagina(paginaAtual + 1)} disabled={paginaAtual === totalPaginas}>
                    Próxima ▶
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}