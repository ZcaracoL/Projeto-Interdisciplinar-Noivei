import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import api from "../services/api";

export default function DetalheLoja() {
  const { id } = useParams(); // Captura o ID vindo da URL
  const [loja, setLoja] = useState(null);
  const [carregando, setCarregando] = useState(true);

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

  if (carregando) {
    return (
      <>
        <Header />
        <div style={{ textAlign: "center", padding: "100px", fontSize: "1.2rem" }}>Carregando detalhes da loja...</div>
        <Footer />
      </>
    );
  }

  if (!loja) {
    return (
      <>
        <Header />
        <div style={{ textAlign: "center", padding: "100px" }}>
          <h2>Loja não encontrada!</h2>
          <Link to="/">Voltar para a Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  // Formata o número do WhatsApp removendo caracteres estranhos (caso haja) para o link de clique direto
  const whatsappLink = loja.telefone 
    ? `https://api.whatsapp.com/send?phone=55${loja.telefone.replace(/\D/g, "")}&text=Olá! Vi seu perfil no Noivei e gostaria de fazer um orçamento.`
    : `https://api.whatsapp.com/send?phone=5514999999999&text=Olá!`; // Fallback padrão caso não tenha telefone salvo ainda

  return (
    <>
      <Header />

      <main style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        
        {/* Cabeçalho do Perfil da Loja */}
        <section style={{ display: "flex", gap: "30px", background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", alignItems: "center", flexWrap: "wrap" }}>
          <img 
            src={loja.imagem || "https://images.unsplash.com/photo-1519741497674-611481863552"} 
            alt={loja.nomeLoja} 
            style={{ width: "200px", height: "200px", borderRadius: "12px", objectFit: "cover" }}
          />
          <div style={{ flex: 1, minWidth: "300px" }}>
            <span style={{ background: "#7c62fc", color: "white", padding: "4px 12px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "bold" }}>
              {loja.categoria || "Geral"}
            </span>
            <h1 style={{ margin: "10px 0 5px 0", color: "#333" }}>{loja.nomeLoja}</h1>
            <p style={{ color: "#777", margin: "0 0 15px 0" }}>📍 {loja.cidade || "Cidade não informada"}</p>
            <p style={{ color: "#555", lineHeight: "1.6", marginBottom: "20px" }}>{loja.descricao}</p>
            
            {/* BOTÃO DO WHATSAPP REQUISITADO */}
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "10px", 
                background: "#25D366", 
                color: "white", 
                padding: "12px 24px", 
                borderRadius: "30px", 
                textDecoration: "none", 
                fontWeight: "bold",
                boxShadow: "0 4px 10px rgba(37, 211, 102, 0.3)"
              }}
            >
              💬 Chamar no WhatsApp {loja.telefone ? `(${loja.telefone})` : ""}
            </a>
          </div>
        </section>

        {/* Listagem de Pacotes e Planos Disponíveis */}
        <section style={{ marginTop: "40px" }}>
          <h2 style={{ color: "#333", marginBottom: "20px" }}>Pacotes e Planos Disponíveis</h2>
          
          {!loja.planos || loja.planos.length === 0 ? (
            <p style={{ color: "#777" }}>Este fornecedor ainda não cadastrou nenhum pacote de serviço.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {loja.planos.map((plano, index) => (
                <div key={index} style={{ background: "white", border: "2px solid #e5e4e7", padding: "24px", borderRadius: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ margin: "0 0 10px 0", color: "#4328c5" }}>{plano.titulo}</h3>
                    <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333", margin: "0 0 15px 0" }}>
                      R$ {Number(plano.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                    <p style={{ color: "#666", lineHeight: "1.5", fontSize: "0.95rem" }}>{plano.descricao}</p>
                  </div>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "block", textAlign: "center", background: "#7c62fc", color: "white", padding: "10px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold", marginTop: "20px" }}
                  >
                    Contratar este Plano
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
    </>
  );
}