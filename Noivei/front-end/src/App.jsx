import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Cadastro from "./pages/cadastro";
import Perfil from "./pages/perfil";
import Lojas from "./pages/lojas"; 
import DetalheLoja from "./pages/detalhesLoja";
import Coracoes from "./pages/coracoes";
import AdminCoracoes from "./pages/adminCoracoes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/perfil"
          element={<Perfil />}
        />

        <Route
          path="/lojas"
          element={<Lojas />}

        />

        <Route
          path="/loja/:id"
          element={<DetalheLoja />}
        />

        <Route
          path="/coracoes"
          element={<Coracoes />}
        />

        <Route
          path="/adminCoracoes"
          element={<AdminCoracoes />}
        />

      </Routes>
    </BrowserRouter>
  );
}