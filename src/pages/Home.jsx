import { Link } from "react-router-dom";
import "../styles/home.css";

import vestImg from "../assets/collections/Vest.png";
import tshirtImg from "../assets/collections/TShirt.png";
import bermudaImg from "../assets/collections/Buddy Mercerised Printed Bermuda.png";
import trackpantsImg from "../assets/collections/Track Pant.png";

function Home() {
  const collections = [
    {
      name: "Vests",
      subtitle: "Breathable all-day layers",
      image: vestImg,
    },
    {
      name: "Round Neck Tees",
      subtitle: "Soft cotton structure",
      image: tshirtImg,
    },
    {
      name: "Bermuda Shorts",
      subtitle: "Relaxed fit for movement",
      image: bermudaImg,
    },
    {
      name: "Track Pants",
      subtitle: "Clean silhouette, easy stretch",
      image: trackpantsImg,
    },
  ];

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-shell hero-shell">
          <div className="hero-content">
            <span className="hero-eyebrow">Everyday Essentials</span>
            <h1>
              Built for Comfort.
              <br />
              Styled for <span>Calm Confidence.</span>
            </h1>
            <p className="hero-subtitle">
              Premium dailywear crafted with breathable fabrics, modern fits,
              and finishes that feel soft from morning to night.
            </p>
            <div className="hero-actions">
              <Link to="/essentials" className="hero-btn primary">
                Shop Collection
              </Link>
              <Link to="/essentials" className="hero-btn outline">
                Explore Essentials
              </Link>
            </div>
          </div>

          <aside className="hero-feature">
            <p className="feature-kicker">CURATED DROP</p>
            <h3>Everyday Core Set</h3>
            <p>
              Vests, tees, bermudas, and track pants designed as one versatile
              wardrobe foundation.
            </p>
            <div className="feature-tags">
              <span>Combed Cotton</span>
              <span>Relaxed Fit</span>
              <span>All-Day Wear</span>
            </div>
            <Link to="/essentials" className="feature-link">
              View Essentials
            </Link>
          </aside>
        </div>
      </section>

      <section className="home-collections">
        <div className="home-shell">
          <div className="section-head">
            <span>Shop Collection</span>
            <h2>Essential Styles for Every Day</h2>
          </div>

          <div className="collection-grid">
            {collections.map((item) => (
              <Link to="/essentials" key={item.name} className="collection-card">
                <div className="collection-image-wrap">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="collection-body">
                  <h3>{item.name}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-comfort-strip">
        <div className="home-shell comfort-shell">
          <div className="comfort-content">
            <span>Soft. Refined. Everyday.</span>
            <h2>Comfort that still feels premium.</h2>
            <p>
              We focus on fine construction and wearable silhouettes so your
              essentials stay polished without feeling heavy or formal.
            </p>
          </div>
          <ul className="comfort-points">
            <li>Breathable materials for all-weather wear</li>
            <li>Modern cuts designed for natural movement</li>
            <li>Durable stitching and long-lasting softness</li>
          </ul>
        </div>
      </section>

      <section className="home-cta">
        <div className="home-shell cta-shell">
          <h2>Ready to upgrade your everyday wardrobe?</h2>
          <p>
            Explore the full essentials collection and find your comfort-first
            fit.
          </p>
          <Link to="/essentials" className="essentials-btn">
            Explore Essentials
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
