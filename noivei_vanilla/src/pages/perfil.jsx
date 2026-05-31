import { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import api from "../services/api";
import "./perfil.css";

export default function Perfil() {
  const [storeData, setStoreData] = useState({
    nomeLoja: "",
    descricao: "",
    imagem: "",
    categoria: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  
  // States para a categoria digitável
  const [categoriaInput, setCategoriaInput] = useState("");
  const [categoriasSugeridas, setCategoriasSugeridas] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const categoriaInputRef = useRef(null);

  // Lista de categorias pré-definidas
  const categoriasPreDefinidas = [
    { id: "alimentacao", nome: "🍔 Alimentação", icone: "🍔" },
    { id: "tecnologia", nome: "💻 Tecnologia", icone: "💻" },
    { id: "moda", nome: "👗 Moda", icone: "👗" },
    { id: "beleza", nome: "💄 Beleza & Estética", icone: "💄" },
    { id: "educacao", nome: "📚 Educação", icone: "📚" },
    { id: "saude", nome: "🏥 Saúde", icone: "🏥" },
    { id: "esportes", nome: "⚽ Esportes", icone: "⚽" },
    { id: "eventos", nome: "🎉 Eventos", icone: "🎉" },
    { id: "consultoria", nome: "📊 Consultoria", icone: "📊" },
    { id: "marketing", nome: "📢 Marketing", icone: "📢" },
    { id: "design", nome: "🎨 Design", icone: "🎨" },
    { id: "fotografia", nome: "📸 Fotografia", icone: "📸" },
    { id: "construcao", nome: "🔨 Construção", icone: "🔨" },
    { id: "automotivo", nome: "🚗 Automotivo", icone: "🚗" },
    { id: "pet", nome: "🐾 Pet", icone: "🐾" },
    { id: "imobiliaria", nome: "🏠 Imobiliária", icone: "🏠" },
    { id: "viagem", nome: "✈️ Viagem", icone: "✈️" },
    { id: "musica", nome: "🎵 Música", icone: "🎵" },
    { id: "financeiro", nome: "💰 Financeiro", icone: "💰" },
    { id: "juridico", nome: "⚖️ Jurídico", icone: "⚖️" },
    { id: "limpeza", nome: "🧹 Limpeza", icone: "🧹" },
    { id: "entregas", nome: "🚚 Entregas", icone: "🚚" },
    { id: "reparos", nome: "🔧 Reparos", icone: "🔧" },
    { id: "outros", nome: "📦 Outros", icone: "📦" },
  ];

  const fornecedorId = localStorage.getItem("fornecedorId");

  // Filtrar sugestões
  const filterSuggestions = (input) => {
    if (!input || input.trim() === "") {
      return [];
    }
    
    const searchTerm = input.toLowerCase();
    const matches = categoriasPreDefinidas.filter(cat =>
      cat.nome.toLowerCase().includes(searchTerm) ||
      cat.id.toLowerCase().includes(searchTerm)
    );
    
    const exactMatch = matches.some(cat => cat.nome.toLowerCase() === searchTerm);
    if (!exactMatch && input.trim() !== "") {
      matches.unshift({
        id: "custom",
        nome: `+ Criar "${input}"`,
        icone: "",
        isCustom: true
      });
    }
    
    return matches.slice(0, 8);
  };

  const handleCategoriaInputChange = (e) => {
    const value = e.target.value;
    setCategoriaInput(value);
    setStoreData(prev => ({ ...prev, categoria: value }));
    
    const suggestions = filterSuggestions(value);
    setCategoriasSugeridas(suggestions);
    setShowSuggestions(suggestions.length > 0);
    setIsCustomCategory(!categoriasPreDefinidas.some(cat => cat.nome === value));
  };

  const selectSuggestion = (suggestion) => {
    if (suggestion.isCustom) {
      const customName = categoriaInput;
      setCategoriaInput(customName);
      setStoreData(prev => ({ ...prev, categoria: customName }));
      setIsCustomCategory(true);
    } else {
      setCategoriaInput(suggestion.nome);
      setStoreData(prev => ({ ...prev, categoria: suggestion.nome }));
      setIsCustomCategory(false);
    }
    setShowSuggestions(false);
  };

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriaInputRef.current && !categoriaInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function carregarDadosPerfil() {
      if (!fornecedorId) return;
      setLoading(true);
      try {
        const response = await api.get("/lojas");
        const meuPerfil = response.data.find(f => f._id === fornecedorId);
        
        if (meuPerfil) {
          setStoreData({
            nomeLoja: meuPerfil.nomeLoja || "",
            descricao: meuPerfil.descricao || "",
            imagem: meuPerfil.imagem || "",
            categoria: meuPerfil.categoria || "",
          });
          setCategoriaInput(meuPerfil.categoria || "");
          if (meuPerfil.imagem) setPreviewImage(meuPerfil.imagem);
          setImageUrlInput(meuPerfil.imagem || "");
          setPlans(meuPerfil.planos || []);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
        showAlert("error", "Erro ao carregar dados do perfil");
      } finally {
        setLoading(false);
      }
    }
    carregarDadosPerfil();
  }, [fornecedorId]);

  function showAlert(type, message) {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 5000);
  }

  function handleStoreChange(e) {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUrlChange(e) {
    const url = e.target.value;
    setImageUrlInput(url);
    setPreviewImage(url);
    setStoreData((prev) => ({ ...prev, imagem: url }));
  }

  function isValidImageUrl(url) {
    if (!url) return true;
    return url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) || 
           url.startsWith('data:image/') ||
           url.includes('cloudinary') ||
           url.includes('imgur');
  }

  function addPlan() {
    setPlans([
      ...plans,
      {
        titulo: "Novo Plano",
        preco: "0",
        descricao: "Descrição do seu novo plano de serviço.",
      },
    ]);
  }

  function removePlan(index) {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  }

  function handlePlanChange(index, field, value) {
    const updatedPlans = [...plans];
    updatedPlans[index][field] = value;
    setPlans(updatedPlans);
  }

  async function saveProfile() {
    if (!fornecedorId) {
      showAlert("error", "Usuário não identificado. Faça login novamente.");
      return;
    }

    if (!storeData.nomeLoja.trim()) {
      showAlert("error", "O nome da loja é obrigatório");
      return;
    }

    if (!storeData.categoria || storeData.categoria.trim() === "") {
      showAlert("error", "Por favor, digite ou selecione uma categoria");
      return;
    }

    if (storeData.imagem && !isValidImageUrl(storeData.imagem)) {
      showAlert("error", "Por favor, insira uma URL válida de imagem");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        nomeLoja: storeData.nomeLoja,
        descricao: storeData.descricao,
        imagem: storeData.imagem,
        categoria: storeData.categoria,
        planos: plans,
      };

      await api.put(`/perfil/${fornecedorId}`, payload);
      showAlert("success", "Alterações salvas com sucesso! 🎉");

    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      showAlert("error", error.response?.data?.message || "Erro ao salvar as informações");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <main className="perfil-page">
        {/* Alertas */}
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>
            <span>{alert.type === "success" ? "✅" : "❌"}</span>
            <span>{alert.message}</span>
          </div>
        )}

        {/* SEÇÃO 1: DADOS GERAIS */}
        <div className="perfil-card">
          <div className="card-header">
            <h2>Personalizar Loja</h2>
          </div>

          {/* Preview da imagem */}
          <div className="profile-preview-container">
            <div className="profile-image-wrapper">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Perfil" 
                  className="profile-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = "flex";
                    }
                  }}
                />
              ) : null}
              <div className="profile-image-placeholder" style={{ display: previewImage ? "none" : "flex" }}>
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* URL da imagem */}
          <div className="form-group">
            <label className="form-label">URL da Foto de Perfil</label>
            <div className="url-input-wrapper">
              <svg className="url-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1 0 1.71-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
              </svg>
              <input
                type="url"
                className="form-input"
                placeholder="https://exemplo.com/minha-foto.jpg"
                value={imageUrlInput}
                onChange={handleImageUrlChange}
              />
            </div>
            <small className="form-help">Insira o link direto da imagem (JPG, PNG, GIF, WEBP ou SVG)</small>
          </div>

          {/* Nome da loja */}
          <div className="form-group">
            <label className="form-label required">Nome da Loja</label>
            <input
              type="text"
              name="nomeLoja"
              className="form-input"
              placeholder="Digite o nome da sua loja"
              value={storeData.nomeLoja}
              onChange={handleStoreChange}
            />
          </div>

          {/* CATEGORIA DIGITÁVEL COM AUTOCOMPLETE */}
          <div className="form-group" ref={categoriaInputRef}>
            <label className="form-label required">
              Categoria da Loja
              {isCustomCategory && storeData.categoria && (
                <span className="custom-badge">✨ Personalizada</span>
              )}
            </label>
            
            <div className="categoria-input-wrapper">
              <input
                type="text"
                className={`form-input ${isCustomCategory && categoriaInput ? 'custom-category-input' : ''}`}
                placeholder="Digite uma categoria (ex: Tecnologia, Moda, ou crie sua própria)"
                value={categoriaInput}
                onChange={handleCategoriaInputChange}
                onFocus={() => {
                  if (categoriaInput) {
                    const suggestions = filterSuggestions(categoriaInput);
                    setCategoriasSugeridas(suggestions);
                    setShowSuggestions(suggestions.length > 0);
                  }
                }}
              />
              
              {/* Sugestões */}
              {showSuggestions && categoriasSugeridas.length > 0 && (
                <div className="categorias-suggestions">
                  {categoriasSugeridas.map((sug, index) => (
                    <div
                      key={index}
                      className={`suggestion-item ${sug.isCustom ? 'custom-suggestion' : ''}`}
                      onClick={() => selectSuggestion(sug)}
                    >
                      <span className="suggestion-icon">{sug.icone}</span>
                      <span className="suggestion-name">{sug.nome}</span>
                      {!sug.isCustom && (
                        <span className="suggestion-badge">Popular</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <small className="form-help">💡 Digite para ver sugestões ou crie sua própria categoria</small>
            
            {/* Chips de categorias populares */}
            <div className="categorias-chips">
              {categoriasPreDefinidas.slice(0, 8).map(cat => (
                <span
                  key={cat.id}
                  className="categoria-chip"
                  onClick={() => {
                    setCategoriaInput(cat.nome);
                    setStoreData(prev => ({ ...prev, categoria: cat.nome }));
                    setIsCustomCategory(false);
                    setShowSuggestions(false);
                  }}
                >
                  <span>{cat.icone}</span>
                  <span>{cat.nome.split(' ')[0]}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Badge da categoria selecionada */}
          {storeData.categoria && (
            <div className={`categoria-badge ${isCustomCategory ? 'custom-categoria-badge' : ''}`}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
              {storeData.categoria}
              {isCustomCategory && " ✨"}
            </div>
          )}

          {/* Descrição */}
          <div className="form-group">
            <label className="form-label">Descrição</label>
            <textarea
              name="descricao"
              className="form-textarea"
              placeholder="Conte um pouco sobre seu serviço..."
              value={storeData.descricao}
              onChange={handleStoreChange}
            />
          </div>
        </div>

        {/* SEÇÃO 2: PLANOS */}
        <div className="perfil-card">
          <div className="card-header">
            <h2>Pacotes de Planos</h2>
            <button onClick={addPlan} className="btn btn-primary add-plan-btn">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Criar Novo Pacote
            </button>
          </div>

          <div className="plans-section">
            {plans.length === 0 ? (
              <div className="empty-plans">
                <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>
                </svg>
                <p>Nenhum plano cadastrado ainda</p>
                <button onClick={addPlan} className="btn btn-outline">
                  Criar seu primeiro plano
                </button>
              </div>
            ) : (
              plans.map((plan, index) => (
                <div className="plan-card" key={index}>
                  <div className="plan-header">
                    <h3 className="plan-title">{plan.titulo || "Plano sem título"}</h3>
                    <span className="plan-number">Pacote #{index + 1}</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Título do Plano</label>
                    <input
                      type="text"
                      className="form-input"
                      value={plan.titulo}
                      placeholder="Ex: Plano Premium"
                      onChange={(e) => handlePlanChange(index, "titulo", e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preço (R$)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={plan.preco}
                      placeholder="0,00"
                      step="0.01"
                      onChange={(e) => handlePlanChange(index, "preco", e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Descrição</label>
                    <textarea
                      className="form-textarea"
                      value={plan.descricao}
                      placeholder="O que está incluso neste plano?"
                      onChange={(e) => handlePlanChange(index, "descricao", e.target.value)}
                      style={{ minHeight: "80px" }}
                    />
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <button
                      onClick={() => removePlan(index)}
                      className="btn btn-danger"
                    >
                      Remover Pacote
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="save-button-wrapper">
          <button
            onClick={saveProfile}
            disabled={loading}
            className="save-button"
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Salvando...
              </>
            ) : (
              <>Salvar Todas as Alterações</>
            )}
          </button>
        </div>
      </main>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner-large"></div>
        </div>
      )}

      <Footer />
    </>
  );
}