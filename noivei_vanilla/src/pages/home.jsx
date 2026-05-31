import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./home.css"; 

export default function Home() {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    async function carregarFornecedores() {
      try {
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
        {/* Hero Section */}
        <section className="x2hero">
          <div className="x2hero-overlay">
            <div className="x2hero-content">
              <div className="x2hero-badge">O maior cerimonialista de casamentos em formato online do Brasil</div>
              <h1>
                Bem-Vindo ao <span className="x2gradient-text">Noivei!</span>
              </h1>
              <p className="x2hero-description">
                O lugar perfeito para noivos encontrarem tudo que precisam para o grande dia.
                Dos melhores fornecedores aos detalhes mais especiais, realizamos seu sonho.
              </p>
              <div className="x2hero-stats">
                <div className="x2stat">
                  <span className="x2stat-number">500+</span>
                  <span className="stat-label">Fornecedores</span>
                </div>
                <div className="stat">
                  <span className="x2stat-number">10k+</span>
                  <span className="x2stat-label">Casais felizes</span>
                </div>
                <div className="stat">
                  <span className="x2stat-number">50+</span>
                  <span className="x2stat-label">Cidades atendidas</span>
                </div>
              </div>
              <div className="x2botoes">
                <Link to="/lojas" className="x2btn-primary">
                  <span>Explorar Fornecedores</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link to="/cadastro" className="x2btn-secondary">
                  <span>Sou Fornecedor</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Categorias */}
        <section className="categorias-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Encontre por categoria</span>
              <h2 className="section-title">Fornecedores <span className="gradient-text">especializados</span></h2>
              <p className="section-description">Os melhores profissionais do mercado, organizados por categoria para facilitar sua busca</p>
            </div>
            <div className="categorias-grid">
              {[
                { nome: "Buffet", icon: "🍽️", cor: "#FF6B6B", desc: "Sabores inesquecíveis" },
                { nome: "Fotografia", icon: "📸", cor: "#4ECDC4", desc: "Memórias eternas" },
                { nome: "Decoração", icon: "🎨", cor: "#45B7D1", desc: "Ambientes dos sonhos" },
                { nome: "Música", icon: "🎵", cor: "#96CEB4", desc: "Trilha perfeita" },
                { nome: "Vestidos", icon: "👗", cor: "#FFEAA7", desc: "Noiva deslumbrante" },
                { nome: "Buffet", icon: "🍰", cor: "#DDA0DD", desc: "Doces especiais" }
              ].map((cat, index) => (
                <div className="categoria-card" key={index} style={{ background: `linear-gradient(135deg, ${cat.cor}20, ${cat.cor}40)` }}>
                  <div className="categoria-icon" style={{ background: cat.cor }}>
                    {cat.icon}
                  </div>
                  <h3>{cat.nome}</h3>
                  <p>{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fornecedores em Destaque */}
        <section className="lojas-destaque">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Destaques da semana</span>
              <h2 className="section-title">Fornecedores <span className="gradient-text">recomendados</span></h2>
              <p className="section-description">Profissionais avaliados e aprovados por nossos casais</p>
            </div>
            
            <div className="cards-container">
              {fornecedores.length === 0 ? (
                <div className="loading-skeleton">
                  {[1,2,3,4].map((i) => (
                    <div className="skeleton-card" key={i}>
                      <div className="skeleton-image"></div>
                      <div className="skeleton-content">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-button"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                fornecedores.slice(0, 6).map((fornecedor) => (
                  <div className="loja-card" key={fornecedor._id}>
                    <div className="loja-card-badge">⭐ Destaque</div>
                    <div className="loja-imagem">
                      <img src={fornecedor.imagem || "https://via.placeholder.com/400x300"} alt={fornecedor.nomeLoja} />
                      <span className="loja-categoria">{fornecedor.categoria}</span>
                    </div>
                    <div className="loja-info">
                      <div className="loja-rating">
                        <div className="stars">★★★★★</div>
                        <span className="rating-value">4.9</span>
                      </div>
                      <h3>{fornecedor.nomeLoja}</h3>
                      <p className="loja-cidade">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {fornecedor.cidade}
                      </p>
                      <p className="loja-descricao">{fornecedor.descricao?.substring(0, 100)}...</p>
                      <Link to={`/loja/${fornecedor._id}`} className="btn-ver-mais">
                        Ver Detalhes
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="como-funciona">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Simples e prático</span>
              <h2 className="section-title">Como <span className="gradient-text">funciona</span>?</h2>
            </div>
            <div className="passos-grid">
              <div className="passo-card">
                <div className="passo-number">01</div>
                <div className="passo-icon">🔍</div>
                <h3>Encontre</h3>
                <p>Explore nosso catálogo de fornecedores e encontre os melhores para seu estilo</p>
              </div>
              <div className="passo-card">
                <div className="passo-number">02</div>
                <div className="passo-icon">💬</div>
                <h3>Compare</h3>
                <p>Analise planos, preços e avaliações de diferentes profissionais</p>
              </div>
              <div className="passo-card">
                <div className="passo-number">03</div>
                <div className="passo-icon">🤝</div>
                <h3>Contrate</h3>
                <p>Entre em contato diretamente e feche o melhor negócio para você</p>
              </div>
              <div className="passo-card">
                <div className="passo-number">04</div>
                <div className="passo-icon">💍</div>
                <h3>Realize</h3>
                <p>Seu casamento perfeito com todos os detalhes cuidados</p>
              </div>
            </div>
          </div>
        </section>
        {/* Depoimentos */}
        <section className="depoimentos">
          <div className="container">
            <div className="section-header light">
              <span className="section-subtitle">O que dizem sobre nós</span>
              <h2 className="section-title">Depoimentos de <span className="gradient-text">casais realizados</span></h2>
            </div>
            <div className="depoimentos-slider">
              {[
                { nome: "Ana & Pedro", texto: "O Noivei transformou nossa busca por fornecedores em algo incrível! Encontramos todos os profissionais perfeitos para nosso grande dia.", cidade: "São Paulo", rating: 5 },
                { nome: "Mariana & Lucas", texto: "Plataforma completa e fácil de usar. Os fornecedores são super profissionais e o atendimento é impecável!", cidade: "Rio de Janeiro", rating: 5 },
                { nome: "Fernanda & Rafael", texto: "Conseguimos economizar e ainda ter tudo de alta qualidade. Recomendo para todos os noivos!", cidade: "Belo Horizonte", rating: 5 }
              ].map((depo, index) => (
                <div className="depoimento-card" key={index}>
                  <div className="depoimento-quote">"</div>
                  <p className="depoimento-texto">{depo.texto}</p>
                  <div className="depoimento-stars">★★★★★</div>
                  <h4 className="depoimento-nome">{depo.nome}</h4>
                  <p className="depoimento-cidade">{depo.cidade}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Pronto para realizar <span className="gradient-text">seu grande dia</span>?</h2>
              <p>Junte-se a milhares de casais que já encontraram os melhores fornecedores para seu casamento</p>
              <Link to="/lojas" className="cta-button">
                Começar agora
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter">
          <div className="container">
            <div className="newsletter-content">
              <h2> Receba novidades</h2>
              <p>Inscreva-se para receber dicas, ofertas exclusivas e novidades sobre casamento</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Seu melhor e-mail" required />
                <button type="submit">Inscrever-se</button>
              </form>
              <small>Prometemos não enviar spam. Você pode cancelar a qualquer momento.</small>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}