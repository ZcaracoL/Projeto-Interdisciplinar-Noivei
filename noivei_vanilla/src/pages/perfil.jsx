import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import api from "../services/api";

export default function Perfil() {
  const [storeData, setStoreData] = useState({
    nomeLoja: "",
    descricao: "",
    imagem: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [plans, setPlans] = useState([]);

  // Recupera o ID do fornecedor logado que foi guardado no localStorage
  const fornecedorId = localStorage.getItem("fornecedorId");

  useEffect(() => {
    async function carregarDadosPerfil() {
      if (!fornecedorId) return;
      try {
        const response = await api.get("/lojas");
        const meuPerfil = response.data.find(f => f._id === fornecedorId);
        
        if (meuPerfil) {
          setStoreData({
            nomeLoja: meuPerfil.nomeLoja || "",
            descricao: meuPerfil.descricao || "",
            imagem: meuPerfil.imagem || null
          });
          if (meuPerfil.imagem) setPreviewImage(meuPerfil.imagem);
          setPlans(meuPerfil.planos || []);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
      }
    }
    carregarDadosPerfil();
  }, [fornecedorId]);

  
  function handleStoreChange(e) {
    const { name, value } = e.target;
    setStoreData((prev) => ({ ...prev, [name]: value }));
  }

  // Manipulação do upload de imagem de perfil
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setStoreData((prev) => ({ ...prev, imagem: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  // Adiciona visualmente um novo plano na lista da tela
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

  // Remove visualmente um plano da lista da tela
  function removePlan(index) {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  }

  // Atualiza os inputs de cada plano específico
  function handlePlanChange(index, field, value) {
    const updatedPlans = [...plans];
    updatedPlans[index][field] = value;
    setPlans(updatedPlans);
  }

  // Função principal para salvar TUDO definitivamente no MongoDB
  async function saveProfile() {
    if (!fornecedorId) {
      alert("Erro: Usuário não identificado. Por favor, faça login novamente.");
      return;
    }

    try {
      const payload = {
        nomeLoja: storeData.nomeLoja,
        descricao: storeData.descricao,
        planos: plans, // Envia todos os planos estruturados
      };

      // Faz a requisição PUT enviando o ID e o corpo do formulário
      const response = await api.put(`/perfil/${fornecedorId}`, payload);

      console.log("Resposta do Banco:", response.data);
      alert("Alterações e pacotes salvos no banco de dados com sucesso! 🎉");

    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar as informações no banco de dados.");
    }
  }

  return (
    <>
      <Header />

      <main className="perfil-page" style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        
        {/* SEÇÃO 1: DADOS GERAIS DO FORNECEDOR */}
        <section className="card" style={{ background: "white", padding: "24px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h2>Personalizar loja</h2>

          <div className="profile-preview" style={{ margin: "20px 0" }}>
            {previewImage ? (
              <img src={previewImage} alt="Preview" style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "150px", height: "150px", borderRadius: "50%", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}>
                Foto de perfil
              </div>
            )}
          </div>

          <label style={{ display: "block", marginBottom: "15px", fontWeight: "bold" }}>
            Alterar foto de perfil
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "block", marginTop: "5px" }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "15px", fontWeight: "bold" }}>
            Nome da loja
            <input
              type="text"
              name="nomeLoja"
              placeholder="Nome da sua loja"
              value={storeData.nomeLoja}
              onChange={handleStoreChange}
              style={{ display: "block", width: "100%", padding: "10px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "15px", fontWeight: "bold" }}>
            Descrição
            <textarea
              name="descricao"
              placeholder="Conte um pouco sobre seu serviço"
              value={storeData.descricao}
              onChange={handleStoreChange}
              style={{ display: "block", width: "100%", padding: "10px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "100px" }}
            />
          </label>
        </section>

        {/* SEÇÃO 2: GERENCIAMENTO DOS PLANOS */}
        <section className="card" style={{ background: "white", padding: "24px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", marginTop: "30px" }}>
          <div className="section-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2>Seus Pacotes de Planos</h2>
            
            <button 
              type="button"
              onClick={addPlan}
              style={{ padding: "8px 16px", background: "#4328c5", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
            >
              + Criar Novo Pacote
            </button>
          </div>

          <div className="plan-list" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {plans.map((plan, index) => (
              <div className="plan-card" key={index} style={{ border: "1px solid #e5e4e7", padding: "20px", borderRadius: "8px", background: "#faf9ff" }}>
                <h3 style={{ marginTop: 0 }}>Pacote #{index + 1}</h3>

                <label style={{ display: "block", marginTop: "10px", fontWeight: "600" }}>
                  Título do Plano
                  <input
                    type="text"
                    value={plan.titulo}
                    placeholder="Ex: Plano Premium"
                    onChange={(e) => handlePlanChange(index, "titulo", e.target.value)}
                    style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
                  />
                </label>

                <label style={{ display: "block", marginTop: "10px", fontWeight: "600" }}>
                  Preço (R$)
                  <input
                    type="number"
                    value={plan.preco}
                    placeholder="Preço"
                    onChange={(e) => handlePlanChange(index, "preco", e.target.value)}
                    style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
                  />
                </label>

                <label style={{ display: "block", marginTop: "10px", fontWeight: "600" }}>
                  Descrição do que está incluso
                  <textarea
                    value={plan.descricao}
                    placeholder="Descrição do plano"
                    onChange={(e) => handlePlanChange(index, "descricao", e.target.value)}
                    style={{ display: "block", width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ccc", minHeight: "60px" }}
                  />
                </label>

                <div className="plan-footer" style={{ marginTop: "15px", textAlign: "right" }}>
                  <button
                    type="button"
                    className="remove-plan"
                    onClick={() => removePlan(index)}
                    style={{ padding: "6px 12px", background: "#d9534f", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Remover Pacote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
          <button
            type="button"
            className="button-primary"
            onClick={saveProfile}
            style={{ 
              padding: "16px 48px", 
              background: "#7c62fc", 
              color: "white", 
              border: "none", 
              borderRadius: "50px", 
              cursor: "pointer", 
              fontWeight: "bold",
              fontSize: "1.1rem",
              boxShadow: "0 10px 25px rgba(124, 98, 252, 0.4)",
              transition: "transform 0.2s, background-color 0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.background = "#654ae6"}
            onMouseOut={(e) => e.currentTarget.style.background = "#7c62fc"}
          >
            Salvar Todas as Alterações e Planos 💾
          </button>
        </div>

      </main>

      <Footer />
    </>
  );
}