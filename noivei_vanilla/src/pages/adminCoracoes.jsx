// src/pages/AdminCoracoes.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import './admincoracoes.css';

export default function AdminCoracoes() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    nomeNoiva: '',
    nomeNoivo: '',
    dataCasamento: '',
    descricao: '',
    fotoNoiva: '',
    fotoNoivo: '',
    fotoCasal: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMsg('');
  };

  function isValidUrl(value) {
    try {
      const u = new URL(value);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch (e) {
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validações simples no front-end
    if (!formData.nomeNoiva || !formData.nomeNoivo || !formData.dataCasamento || !formData.descricao) {
      setErrorMsg('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!isValidUrl(formData.fotoNoiva) || !isValidUrl(formData.fotoNoivo) || !isValidUrl(formData.fotoCasal)) {
      setErrorMsg('Uma ou mais URLs de foto são inválidas. Use links começando por http:// ou https://');
      return;
    }

    setCarregando(true);

    try {
      const response = await api.post('/coracoes/casais', formData);
      if (response && response.status === 201) {
        navigate('/coracoes');
      } else {
        setErrorMsg('Resposta inesperada do servidor.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      if (error.response) {
        // Erro retornado pelo servidor
        setErrorMsg(error.response.data?.error || 'Erro no servidor: ' + error.response.status);
      } else if (error.request) {
        // Sem resposta (erro de conexão)
        setErrorMsg('Não foi possível conectar ao servidor. Verifique se o backend está rodando na porta 5000.');
      } else {
        setErrorMsg('Erro: ' + error.message);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header />
      
      <div className="pagina-admin-coracoes">
        <div className="container-admin">
          <div className="admin-header">
            <h1>💕 Cadastre sua História de Amor</h1>
            <p>Compartilhe seu amor com o mundo! Seus corações vão flutuar na página principal.</p>
          </div>

          {errorMsg && <div className="error-message">{errorMsg}</div>}
          <form onSubmit={handleSubmit} className="form-casal">
            <div className="form-group">
              <label>Nome da Noiva 👰</label>
              <input
                type="text"
                name="nomeNoiva"
                value={formData.nomeNoiva}
                onChange={handleChange}
                required
                placeholder="Ex: Ana Clara"
              />
            </div>

            <div className="form-group">
              <label>Nome do Noivo 🤵</label>
              <input
                type="text"
                name="nomeNoivo"
                value={formData.nomeNoivo}
                onChange={handleChange}
                required
                placeholder="Ex: João Pedro"
              />
            </div>

            <div className="form-group">
              <label>Data do Casamento 📅</label>
              <input
                type="date"
                name="dataCasamento"
                value={formData.dataCasamento}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>URL da Foto da Noiva</label>
              <input
                type="url"
                name="fotoNoiva"
                value={formData.fotoNoiva}
                onChange={handleChange}
                required
                placeholder="https://exemplo.com/foto-noiva.jpg"
              />
              <small>Cole o link da foto (pode usar Imgur, Google Drive, etc)</small>
            </div>

            <div className="form-group">
              <label>URL da Foto do Noivo</label>
              <input
                type="url"
                name="fotoNoivo"
                value={formData.fotoNoivo}
                onChange={handleChange}
                required
                placeholder="https://exemplo.com/foto-noivo.jpg"
              />
            </div>

            <div className="form-group">
              <label>URL da Foto do Casal Juntos</label>
              <input
                type="url"
                name="fotoCasal"
                value={formData.fotoCasal}
                onChange={handleChange}
                required
                placeholder="https://exemplo.com/foto-casal.jpg"
              />
            </div>

            <div className="form-group">
              <label>História de Amor 💝</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Conte como se conheceram, o pedido, momentos especiais..."
              />
            </div>

            <button type="submit" className="btn-submit" disabled={carregando}>
              {carregando ? 'Cadastrando...' : '💖 Enviar para o infinito 💖'}
            </button>
          </form>

          <div className="preview-info">
            <h3>✨ Como funciona?</h3>
            <p>1. Preencha todos os dados com fotos e história de amor</p>
            <p>2. Seu casal vai aparecer como um coração flutuante na página principal</p>
            <p>3. Os visitantes podem clicar no coração e ver toda vossa história</p>
            <p>4. Os corações flutuam infinitamente, espalhando amor pela página</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}