import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <h3>GlamGo</h3>
          <p>Soft essentials for everyday comfort and premium ease.</p>
        </div>

        <nav className="footer-links" aria-label="Footer Navigation">
          <Link to="/">Home</Link>
          <Link to="/essentials">Essentials</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
      <p className="footer-bottom">2026 GlamGo. Crafted for daily comfort.</p>
    </footer>
  );
}

export default Footer;
