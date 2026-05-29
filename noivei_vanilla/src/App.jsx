
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Cadastro from "./pages/cadastro";
import Perfil from "./pages/perfil";

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
      </Routes>
    </BrowserRouter>
  );
}

