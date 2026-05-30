import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Cadastro from "./pages/cadastro";
import Perfil from "./pages/perfil";
import Lojas from "./pages/Lojas"; 
import DetalheLoja from "./pages/DetalheLoja";

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
      </Routes>
    </BrowserRouter>
  );
}