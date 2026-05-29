
import { useState } from "react";
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

  const [plans, setPlans] = useState([
    {
      titulo: "Plano Básico",
      preco: "800",
      descricao:
        "Até 4 horas de serviço e atendimento por WhatsApp.",
    },
    {
      titulo: "Plano Premium",
      preco: "1300",
      descricao:
        "Cobertura completa, álbum digital e reunião presencial.",
    },
  ]);

  // =========================
  // ALTERAR CAMPOS DA LOJA
  // =========================
  function handleStoreChange(e) {
    const { name, value } = e.target;

    setStoreData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // =========================
  // IMAGEM DE PERFIL
  // =========================
  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      setStoreData((prev) => ({
        ...prev,
        imagem: file,
      }));

      setPreviewImage(URL.createObjectURL(file));
    }
  }

  // =========================
  // PLANOS
  // =========================
  function addPlan() {
    setPlans([
      ...plans,
      {
        titulo: "",
        preco: "",
        descricao: "",
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
  try {
    const payload = {
      nomeLoja: storeData.nomeLoja,
      descricao: storeData.descricao,
      planos: plans,
    };

    const response = await api.post(
      "/perfil",
      payload
    );

    console.log(response.data);

    alert("Perfil salvo com sucesso!");

  } catch (error) {
    console.log(error);

    alert("Erro ao salvar perfil");
  }
}



  return (
    <>
      <Header />

      <main className="perfil-page">
        {/* CARD PERFIL */}
        <section className="card">
          <h2>Personalizar loja</h2>

          <div className="profile-preview">
            {previewImage ? (
              <img src={previewImage} alt="Preview" />
            ) : (
              <span>Foto de perfil</span>
            )}
          </div>

          <label>
            Foto de perfil

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          <label>
            Nome da loja

            <input
              type="text"
              name="nomeLoja"
              placeholder="Nome da sua loja"
              value={storeData.nomeLoja}
              onChange={handleStoreChange}
            />
          </label>

          <label>
            Descrição

            <textarea
              name="descricao"
              placeholder="Conte um pouco sobre seu serviço"
              value={storeData.descricao}
              onChange={handleStoreChange}
            />
          </label>

          <button
            className="button-primary"
            onClick={saveProfile}
          >
            Salvar informações
          </button>
        </section>

        {/* PLANOS */}
        <section className="card">
          <div className="section-head">
            <h2>Planos</h2>

            <button onClick={addPlan}>
              Adicionar plano
            </button>
          </div>

          <div className="plan-list">
            {plans.map((plan, index) => (
              <div className="plan-card" key={index}>
                <h3>Plano {index + 1}</h3>

                <label>
                  Título

                  <input
                    type="text"
                    value={plan.titulo}
                    placeholder="Título do plano"
                    onChange={(e) =>
                      handlePlanChange(
                        index,
                        "titulo",
                        e.target.value
                      )
                    }
                  />
                </label>

                <label>
                  Preço

                  <input
                    type="text"
                    value={plan.preco}
                    placeholder="Preço"
                    onChange={(e) =>
                      handlePlanChange(
                        index,
                        "preco",
                        e.target.value
                      )
                    }
                  />
                </label>

                <label>
                  Descrição

                  <textarea
                    value={plan.descricao}
                    placeholder="Descrição do plano"
                    onChange={(e) =>
                      handlePlanChange(
                        index,
                        "descricao",
                        e.target.value
                      )
                    }
                  />
                </label>

                <div className="plan-footer">
                  <button
                    className="remove-plan"
                    onClick={() => removePlan(index)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

