import { Container, Box, Button, Stack } from "@mui/material";
import "../styles/home.css";

import vestImg from "../assets/collections/vest.png";
import tshirtImg from "../assets/collections/tshirt.png";
import bermudaImg from "../assets/collections/bermuda.png";
import trackpantsImg from "../assets/collections/trackpants.png";

function Home() {
  return (
    <main className="home">
      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <Container maxWidth="lg">
          <Box
            className="hero-content"
            sx={{
              textAlign: { xs: "center", md: "left" },
              maxWidth: 520,
            }}
          >
            <span className="hero-eyebrow">Everyday Essentials</span>

            <h1>
              Built for Comfort.
              <br />
              Designed for
              <br />
              <span>Everyday Wear.</span>
            </h1>

            <p className="hero-subtitle">
              Premium vests, round-neck tees, bermuda shorts, and track pants
              crafted for comfort, movement, and modern living.
            </p>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ marginTop: 4 }}
            >
              <Button variant="contained" className="hero-btn primary">
                Shop Collection
              </Button>

              <Button variant="outlined" className="hero-btn outline">
                Explore Essentials
              </Button>
            </Stack>
          </Box>
        </Container>
      </section>

      {/* ================= SHOP COLLECTION ================= */}
      <section className="shop-collection">
        <h2>Shop Collection</h2>

        <div className="collection-grid">
          <a href="/glamcare" className="collection-card">
            <img src={vestImg} alt="Vests" />
            <div className="card-overlay">View Collection</div>
            <h3>Vests</h3>
          </a>

          <a href="/glamcare" className="collection-card">
            <img src={tshirtImg} alt="Round Neck Tees" />
            <div className="card-overlay">View Collection</div>
            <h3>Round Neck Tees</h3>
          </a>

          <a href="/glamcare" className="collection-card">
            <img src={bermudaImg} alt="Bermuda Shorts" />
            <div className="card-overlay">View Collection</div>
            <h3>Bermuda Shorts</h3>
          </a>

          <a href="/glamcare" className="collection-card">
            <img src={trackpantsImg} alt="Track Pants" />
            <div className="card-overlay">View Collection</div>
            <h3>Track Pants</h3>
          </a>
        </div>
      </section>

      {/* ================= EXPLORE ESSENTIALS ================= */}
      <section className="explore-essentials">
        <div className="essentials-content">
          <h2>Explore Essentials</h2>
          <p>
            Designed for everyday comfort, our essentials are crafted with
            breathable fabrics, modern fits, and durability that moves with you.
          </p>

          <a href="/glamcare" className="essentials-btn">
            Explore Essentials
          </a>
        </div>
      </section>
    </main>
  );
}

export default Home;
