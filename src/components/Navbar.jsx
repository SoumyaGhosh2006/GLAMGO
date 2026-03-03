import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";

import "../styles/navbar.css";
import logo from "../assets/logo.png";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="lg" className="navbar-container">
        <Toolbar disableGutters className="navbar-toolbar">
          <Box className="navbar-brand">
            <Link to="/" className="brand-link">
              <div className="logo-container">
                <img src={logo} alt="GlamGo Logo" className="logo" />
              </div>
            </Link>
          </Box>

          <Box className="navbar-links">
            <Box className="nav-menu-shell">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/essentials" className="nav-link">
                Essentials
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>

              <Button className="explore-btn">Explore</Button>
            </Box>
          </Box>

          <Box className="navbar-mobile">
            <Button className="mobile-menu-btn">Menu</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
