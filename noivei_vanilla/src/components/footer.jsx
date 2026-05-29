import "./footer.css";

export default function Footer() {
return ( <footer> <section className="legal-notice"> <div className="legal-notice-wrapper"> <h2>Legal notice</h2>


      <p>
        We would like to inform you that this is an entirely
        independent site that does not request any type of payment.
      </p>
    </div>
  </section>

  <div className="footer-container">
    <div className="footer-menu">
      <h4 className="footer-title">Navigation</h4>

      <ul className="footer-menu-items">
        <li><a href="/">Home</a></li>
        <li><a href="/perfil">Perfil</a></li>
        <li><a href="/lojas">Lojas</a></li>
      </ul>
    </div>

    <div className="footer-menu">
      <h4 className="footer-title">Social medias</h4>

      <div className="social-icons">
        <a href="https://instagram.com">
          Instagram
        </a>
      </div>
    </div>
  </div>
</footer>


);
}
