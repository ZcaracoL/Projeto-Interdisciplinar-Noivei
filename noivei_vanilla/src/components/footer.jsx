import "./footer.css";

export default function Footer() {
  return (
    <footer>
      <section className="legal-notice">
        <div className="legal-notice-wrapper">
          <h2>Aviso Legal</h2>
          <p>
            Informamos que este é um site totalmente independente que não 
            solicita nenhum tipo de pagamento.
          </p>
        </div>
      </section>

      <div className="footer-container">
        <div className="footer-menu">
          <h4 className="footer-title">Navegação</h4>
          <ul className="footer-menu-items">
            <li><a href="/"> Início</a></li>
            <li><a href="/lojas"> Lojas</a></li>
          </ul>
        </div>

        <div className="footer-menu">
          <h4 className="footer-title">Redes Sociais</h4>
          <div className="social-icons">
            <a href="https://tiktok.com" className="social-link tiktok" target="_blank" rel="noopener noreferrer">
              <svg className="icon" viewBox="0 0 24 24" width="24" height="24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="https://x.com" className="social-link x" target="_blank" rel="noopener noreferrer">
              <svg className="icon" viewBox="0 0 24 24" width="24" height="24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}