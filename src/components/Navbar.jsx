import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Badge,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // MUI cart icon

import "../styles/navbar.css";
import logo from "../assets/logo.png";

import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Navbar() {
  // Get cartCount from global cart
  const { cartCount } = useCart();

  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="lg" className="navbar-container">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>

          {/* ================= LOGO ================= */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link to="/">
              <div className="logo-container">
                <img src={logo} alt="GlamGo Logo" className="logo" />
              </div>
            </Link>
          </Box>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
            }}
          >
            {/* Use Link instead of <a> for routing */}
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/essentials" className="nav-link">Essentials</Link>
            <Link to="/contact" className="nav-link">Contact</Link>

            <Button className="explore-btn">
              Explore
            </Button>

            {/* ================= CART ICON ================= */}
            <Link to="/cart" className="cart-link">
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon sx={{ color: "#333" }} />
              </Badge>
            </Link>
          </Box>

          {/* ================= MOBILE MENU (Future) ================= */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Button sx={{ color: "#333" }}>Menu</Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
