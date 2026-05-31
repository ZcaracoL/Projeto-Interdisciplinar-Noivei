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

  const ultimoIndex = paginaAtual * itensPorPagina;
  const primeiroIndex = ultimoIndex - itensPorPagina;
  const fornecedoresAtuais = fornecedores.slice(primeiroIndex, ultimoIndex);
  const totalPaginas = Math.ceil(fornecedores.length / itensPorPagina);

  const irParaPagina = (numero) => {
    setPaginaAtual(numero);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

          {carregando ? (
            <div className="carregando">Carregando fornecedores...</div>
          ) : fornecedores.length === 0 ? (
            <div className="vazio">Nenhum fornecedor encontrado.</div>
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