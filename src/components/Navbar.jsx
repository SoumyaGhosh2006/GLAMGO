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
            <Link to="/">
              <div className="logo-container">
                <img src={logo} alt="GlamGo Logo" className="logo" />
              </div>
            </Link>
          </Box>

          <Box className="navbar-links">
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

          <Box className="navbar-mobile">
            <Button sx={{ color: "#333" }}>Menu</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
