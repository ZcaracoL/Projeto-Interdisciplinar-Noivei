import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import api from "../services/api";
import "./detalhesloja.css"; // Importando o CSS moderno

export default function DetalheLoja() {
  const { id } = useParams();
  const [loja, setLoja] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [imagemErro, setImagemErro] = useState(false);

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        const response = await api.get(`/lojas/${id}`);
        setLoja(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes da loja:", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarDetalhes();
  }, [id]);

  const whatsappLink = loja?.telefone 
    ? `https://api.whatsapp.com/send?phone=55${loja.telefone.replace(/\D/g, "")}&text=Olá! Vi seu perfil no Noivei e gostaria de fazer um orçamento.`
    : `https://api.whatsapp.com/send?phone=5514999999999&text=Olá!`;

  const imagemDefault = "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop";
  const imagemLoja = imagemErro || !loja?.imagem ? imagemDefault : loja.imagem;

  if (carregando) {
    return (
      <>
        <Header />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando detalhes da loja...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!loja) {
    return (
      <>
        <Header />
        <div className="error-container">
          <div className="error-icon">🔍</div>
          <h2>Loja não encontrada!</h2>
          <p>O fornecedor que você está procurando não existe ou foi removido.</p>
          <Link to="/" className="btn-back-home">Voltar para a Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="detalhe-loja-main">
        {/* Hero Section com imagem de fundo */}
        <div className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="hero-badge">{loja.categoria || "Fornecedor Premium"}</div>
            <h1 className="hero-title">{loja.nomeLoja}</h1>
            <p className="hero-location">
              <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {loja.cidade || "Localização não informada"}
            </p>
          </div>
        </div>

        <div className="content-wrapper">
          {/* Perfil da Loja */}
          <div className="profile-section">
            <div className="profile-image-container">
              <img 
                src={imagemLoja} 
                alt={loja.nomeLoja}
                className="profile-image"
                onError={() => setImagemErro(true)}
              />
              <div className="image-overlay"></div>
            </div>
            
            <div className="profile-info">
              <div className="description-card">
                <h2>Sobre Nós</h2>
                <p>{loja.descricao || "Este fornecedor ainda não adicionou uma descrição. Entre em contato para mais informações sobre os serviços oferecidos."}</p>
              </div>
              
              <div className="contact-card">
                <h3>Entre em Contato</h3>
                <p>Garanta já o melhor para o seu grande dia!</p>
                <a 
                  href={whatsappLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.032 2.016c-5.52 0-10 4.48-10 10 0 1.776.48 3.504 1.344 4.992l-1.344 4.992 5.088-1.344c1.44.816 3.072 1.344 4.896 1.344 5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18.432c-1.488 0-2.928-.384-4.176-1.104l-.336-.192-3.024.816.816-2.976-.192-.336c-.768-1.248-1.152-2.688-1.152-4.176 0-4.608 3.744-8.352 8.352-8.352 4.608 0 8.352 3.744 8.352 8.352 0 4.608-3.744 8.352-8.352 8.352zm4.608-6.24c-.24-.12-1.392-.672-1.632-.768-.24-.096-.432-.144-.576.144-.144.24-.624.768-.768.96-.144.192-.288.192-.528.072-.24-.12-1.008-.384-1.92-1.152-.72-.624-1.2-1.392-1.344-1.632-.144-.24-.016-.384.096-.528.096-.096.24-.24.336-.384.096-.144.144-.24.24-.408.096-.144.048-.288-.024-.432-.072-.144-.576-1.392-.816-1.92-.192-.48-.384-.384-.528-.384h-.432c-.144 0-.384.048-.576.24-.192.192-.768.768-.768 1.872 0 1.104.816 2.16.912 2.304.096.144 1.488 2.352 3.648 3.216.528.192.912.288 1.248.384.528.144.96.096 1.344.048.384-.048 1.152-.48 1.296-.96.144-.48.144-.864.096-.96-.048-.096-.144-.144-.384-.264z"/>
                  </svg>
                  Falar com {loja.nomeLoja.split(' ')[0]}
                  {loja.telefone && <span className="phone-number">({loja.telefone})</span>}
                </a>
              </div>
            </div>
          </div>

          {/* Planos e Pacotes */}
          <div className="planos-section">
            <div className="section-header">
              <h2>Pacotes e Planos</h2>
              <p>Escolha o plano ideal para o seu casamento dos sonhos</p>
            </div>

            {!loja.planos || loja.planos.length === 0 ? (
              <div className="empty-state">
                <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <h3>Nenhum plano disponível no momento</h3>
                <p>Este fornecedor ainda não cadastrou seus pacotes de serviços.</p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-contact-empty">
                  Solicitar informações personalizadas
                </a>
              </div>
            ) : (
              <div className="planos-grid">
                {loja.planos.map((plano, index) => (
                  <div key={index} className="plano-card">
                    <div className="plano-header">
                      <h3>{plano.titulo}</h3>
                      <div className="plano-price">
                        <span className="currency">R$</span>
                        <span className="value">{Number(plano.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                    <div className="plano-body">
                      <p>{plano.descricao}</p>
                    </div>
                    <div className="plano-footer">
                      <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-contratar"
                      >
                        Contratar Plano
                        <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Call to Action final */}
          <div className="cta-final">
            <div className="cta-content">
              <h3>Pronto para realizar o sonho do seu casamento?</h3>
              <p>Entre em contato agora mesmo e comece a planejar o momento mais especial da sua vida!</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-cta-whatsapp">
                <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.032 2.016c-5.52 0-10 4.48-10 10 0 1.776.48 3.504 1.344 4.992l-1.344 4.992 5.088-1.344c1.44.816 3.072 1.344 4.896 1.344 5.52 0 10-4.48 10-10s-4.48-10-10-10z"/>
                </svg>
                Quero fazer um orçamento!
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}