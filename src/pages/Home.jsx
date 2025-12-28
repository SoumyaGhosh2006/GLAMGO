import { Container, Box, Button, Stack } from "@mui/material";
import "../styles/home.css";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <Container maxWidth="lg">
          <Box
            className="hero-content"
            sx={{
              textAlign: { xs: "center", md: "left" },
              maxWidth: 520,
            }}
          >
            {/* Eyebrow text (small but powerful) */}
            <span className="hero-eyebrow">
              Everyday Essentials
            </span>

            <h1>
              Built for Comfort.<br />
              Designed for<br />
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
              <Button
                variant="contained"
                className="hero-btn primary"
              >
                Shop Collection
              </Button>

              <Button
                variant="outlined"
                className="hero-btn outline"
              >
                Explore Essentials
              </Button>
            </Stack>
          </Box>
        </Container>
      </section>
    </main>
  );
}

export default Home;
