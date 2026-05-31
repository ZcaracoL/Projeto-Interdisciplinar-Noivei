import { Link } from "react-router-dom";
import { useState } from "react";
import "./header.css";
import Noivei2 from "../assets/midias/Noivei2.png";

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <header id="headerunica">
      <div className="logo">
        <Link to="/" onClick={fecharMenu}>
          <img src={Noivei2} alt="Logo" />
        </Link>
      </div>

      <button 
        className="menu-toggle" 
        onClick={toggleMenu}
        aria-label="Menu"
      >
        ☰
      </button>

      <nav className={`menu-desktop ${menuAberto ? "ativo" : ""}`}>
        <Link to="/lojas" className="shortcut" onClick={fecharMenu}>
          Lojas
        </Link>
      </nav>
    </header>
  );
}