import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo1.png";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <nav className="navbar-toolbar" aria-label="Primary navigation">
          <div className="navbar-brand">
            <Link to="/" className="brand-link" aria-label="GLAMGO home">
              <div className="logo-container">
                <img src={logo} alt="GlamGo Logo" className="logo" />
              </div>
            </Link>
          </div>

          <div className="navbar-links">
            <div className="nav-menu-shell">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/#about" className="nav-link">
                About
              </Link>
              <Link to="/essentials" className="nav-link">
                Essentials
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
              <Link to="/purchase" className="purchase-btn">
                Purchase
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
