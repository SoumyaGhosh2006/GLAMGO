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
            }}
          >
            <h1>
              Where <span>Nature</span> Meets <span>Style</span>
            </h1>

            <p className="hero-subtitle">
              A global bridge between agro excellence, sustainable goods,
              and modern fashion.
            </p>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <Button variant="contained" className="hero-btn">
                Agro
              </Button>

              <Button variant="contained" className="hero-btn primary">
                Fashion
              </Button>

              <Button variant="contained" className="hero-btn">
                Bags
              </Button>
            </Stack>
          </Box>
        </Container>
      </section>
    </main>
  );
}

export default Home;
