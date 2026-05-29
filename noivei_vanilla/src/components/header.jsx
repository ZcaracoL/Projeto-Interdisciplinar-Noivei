import { Link } from "react-router-dom";
import { useState } from "react";
import "./header.css";
import Noivei2 from "../assets/midias/Noivei2.png";

export default function Header() {
const [menuAberto, setMenuAberto] = useState(false);

return ( <header> <div className="logo"> <Link to="/"> <img src={ Noivei2 } alt="Logo" /> </Link> </div>

  <div
    className="menu-toggle"
    onClick={() => setMenuAberto(!menuAberto)}
  >
    ☰
  </div>

  <div className={`menu-desktop ${menuAberto ? "ativo" : ""}`}>
    <Link className="shortcut" to="/lojas">
      Lojas
    </Link>

    <div className="search">
      <form>
        <input type="text" placeholder="Pesquisar..." />
        <button>🔍</button>
      </form>
    </div>
  </div>

  <div className="perfil"></div>
</header>


);
}
