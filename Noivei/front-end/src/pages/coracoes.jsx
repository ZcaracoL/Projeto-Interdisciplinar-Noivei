// src/pages/Coracoes.jsx
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'; // Adicione esta importação
import Header from '../components/header';
import Footer from '../components/footer';
import CoracaoCard from '../components/coracaoCard';
import api from '../services/api';
import './coracoes.css';

export default function Coracoes() {
  const [casais, setCasais] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [casalSelecionado, setCasalSelecionado] = useState(null);

  useEffect(() => {
    carregarCasais();
  }, []);

  const carregarCasais = async () => {
    try {
      const response = await api.get('/coracoes/casais');
      const casaisComPosicoes = response.data.map(casal => ({
        ...casal,
        posicaoX: Math.random() * 85 + 5,
        duracao: Math.random() * 8 + 9
      }));
      setCasais(casaisComPosicoes);
    } catch (error) {
      console.error('Erro ao carregar casais:', error);
    } finally {
      setCarregando(false);
    }
  };

  const abrirModal = (casal) => {
    setCasalSelecionado(casal);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setCasalSelecionado(null);
  };

  const handleCoracaoRemovido = useCallback((id) => {
    setCasais(prev => prev.filter(c => c._id !== id));
    const casalRemovido = casais.find(c => c._id === id);
    if (casalRemovido) {
      setTimeout(() => {
        setCasais(prev => [...prev, {
          ...casalRemovido,
          posicaoX: Math.random() * 85 + 5,
          duracao: Math.random() * 8 + 9
        }]);
      }, 500);
    }
  }, [casais]);

  return (
    <>
      <Header />
      
      <div className="pagina-coracoes">
        <div className="hero-coracoes">
          <h1>Corações do Amor Eterno 💖</h1>
          <p>Clique em qualquer coração para conhecer histórias de amor feitas pelo noivei</p>
          
          {/* BOTÃO DE CADASTRO DENTRO DO HERO */}
          <Link to="/admincoracoes" className="btn-cadastrar-hero">
            💝 Cadastrar minha história de amor 💝
          </Link>
        </div>

        {/* BOTÃO FLUTUANTE (opção extra) */}
        <Link to="/admincoracoes" className="btn-flutuante-cadastro">
          ✍️ Contar meu amor
        </Link>

        <div className="floating-hearts-container">
          {!carregando && casais.map((casal) => (
            <CoracaoCard 
              key={casal._id} 
              casal={casal} 
              onAbrirModal={abrirModal}
            />
          ))}
        </div>

        {/* Modal de detalhes do casal */}
        {modalAberto && casalSelecionado && (
          <div className="modal-overlay" onClick={fecharModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-fechar" onClick={fecharModal}>✕</button>
              
              <div className="modal-fotos">
                <div className="foto-frame">
                  <img src={casalSelecionado.fotoNoiva} alt={casalSelecionado.nomeNoiva} />
                  <span className="foto-label">👰 {casalSelecionado.nomeNoiva}</span>
                </div>
                <div className="foto-frame">
                  <img src={casalSelecionado.fotoNoivo} alt={casalSelecionado.nomeNoivo} />
                  <span className="foto-label">🤵 {casalSelecionado.nomeNoivo}</span>
                </div>
                <div className="foto-frame">
                  <img src={casalSelecionado.fotoCasal} alt="Casal" />
                  <span className="foto-label">💕 Juntos</span>
                </div>
              </div>

              <h2 className="modal-nomes">
                {casalSelecionado.nomeNoiva} & {casalSelecionado.nomeNoivo}
              </h2>
              
              <div className="modal-data">
                📅 {new Date(casalSelecionado.dataCasamento).toLocaleDateString('pt-BR')}
              </div>
              
              <p className="modal-descricao">
                {casalSelecionado.descricao}
              </p>

              <button className="modal-fechar-btn" onClick={fecharModal}>
                Fechar ❤️
              </button>
            </div>
          </div>
        )}

        {carregando && (
          <div className="carregando-coracoes">
            <div className="heart-loading">💖</div>
            <p>Carregando histórias de amor...</p>
          </div>
        )}

        <div className="mensagem-romantica">
          ✨ Clique em qualquer coração para ver histórias de amor ✨
        </div>
      </div>

      <Footer />
    </>
  );
}