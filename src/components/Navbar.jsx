import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import '../styles/navbar.css';

function Navbar() {
  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          
          {/* Logo / Brand Name */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <div className="logo-container">
                {/* PUT IMAGE HERE */}
            </div>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
            <a href="#" className="nav-link">Home</a>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact Us</a>
            <Button className="explore-btn">
              Explore
            </Button>
          </Box>

          {/* Mobile Menu Icon (Placeholder) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button sx={{ color: '#333' }}>Menu</Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
