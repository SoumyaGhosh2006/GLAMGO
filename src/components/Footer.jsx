import { Link } from "react-router-dom";
import "../styles/footer.css";
import { contactInfo } from "../data/companyInfo";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-brand">
          <h3>GlamGo</h3>
          <p>
            Premium undergarments, sportswear, and jeans made with
            uncompromising quality.
          </p>
        </div>

        <nav className="footer-links" aria-label="Footer Navigation">
          <Link to="/">Home</Link>
          <Link to="/#about">About</Link>
          <Link to="/essentials">Essentials</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/purchase">Purchase</Link>
        </nav>
      </div>
      <p className="footer-bottom">
        {contactInfo.email} | {contactInfo.phones[0]} | {contactInfo.addressLines[2]}
      </p>
    </footer>
  );
}

export default Footer;
