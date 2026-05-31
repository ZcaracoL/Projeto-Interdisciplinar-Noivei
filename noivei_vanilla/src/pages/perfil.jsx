import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import api from "../services/api";
import "./Perfil.css"; // Importe o CSS

export default function Perfil() {
  const [storeData, setStoreData] = useState({
    nomeLoja: "",
    descricao: "",
    imagem: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const fornecedorId = localStorage.getItem("fornecedorId");

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
            imagem: meuPerfil.imagem || ""
          });
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
        {alert.show && (
          <div className={`alert alert-${alert.type}`}>
            <span>{alert.type === "success" ? "✅" : "❌"}</span>
            <span>{alert.message}</span>
          </div>
        )}

        {/* Dados Gerais */}
        <div className="perfil-card">
          <div className="card-header">
            <h2>Personalizar Loja</h2>
          </div>

          <div className="profile-preview-container">
            <div className="profile-image-wrapper">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Perfil" 
                  className="profile-image"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
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

          <div className="form-group">
            <label className="form-label required">URL da Foto de Perfil</label>
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
            <small style={{ color: "var(--gray-600)", display: "block", marginTop: "0.25rem" }}>
              Insira o link direto da imagem (JPG, PNG, GIF, WEBP ou SVG)
            </small>
          </div>

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

        {/* Planos */}
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
              <div style={{ textAlign: "center", padding: "3rem", color: "var(--gray-500)" }}>
                <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>
                </svg>
                <p style={{ marginTop: "1rem" }}>Nenhum plano cadastrado ainda</p>
                <button onClick={addPlan} className="btn btn-outline" style={{ marginTop: "1rem" }}>
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
                      style={{ padding: "0.5rem 1rem" }}
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
        <div style={{ marginTop: "2rem" }}>
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
              <>
                💾 Salvar Todas as Alterações
              </>
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