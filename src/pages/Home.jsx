import { Link } from "react-router-dom";
import "../styles/home.css";
import { companyStory, qualityHighlights } from "../data/companyInfo";

import vestImg from "../assets/collections/Vest.png";
import tshirtImg from "../assets/collections/TShirt.png";
import bermudaImg from "../assets/collections/Buddy Mercerised Printed Bermuda.png";
import trackpantsImg from "../assets/collections/Track Pant.png";
import whyChooseUsImg from "../assets/why_choose_us.png";

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
            <span className="hero-eyebrow">International Quality Standards</span>
            <h1>
              Premium undergarments,
              <br />
              sportswear, and <span>jeans built to perform.</span>
            </h1>
            <p className="hero-subtitle">
              GLAMGO blends superior craftsmanship, fashion-forward design, and
              comfort-first construction to serve modern lifestyles with
              dependable quality.
            </p>
            <div className="hero-actions">
              <Link to="/essentials" className="hero-btn primary">
                Explore Collection
              </Link>
              <Link to="/#about" className="hero-btn outline">
                Why Choose Us
              </Link>
            </div>
          </div>

          <aside className="hero-feature">
            <p className="feature-kicker">GLAMGO PROMISE</p>
            <h3>Style meets comfort without compromise.</h3>
            <p>
              Every product is shaped by rigorous quality control, trend-aware
              design, and pricing that keeps premium manufacturing competitive.
            </p>
            <div className="feature-tags">
              <span>Expert QC Team</span>
              <span>Premium Finish</span>
              <span>Modern Patterns</span>
            </div>
            <Link to="/purchase" className="feature-link">
              Go to Purchase Page
            </Link>
          </aside>
        </div>
      </section>

      <section className="home-collections">
        <div className="home-shell">
          <div className="section-head">
            <span>Featured Collection</span>
            <h2>Comfort-first categories with premium appeal</h2>
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
            <span>Quality-First Manufacturing</span>
            <h2>Every detail is checked before it reaches your market.</h2>
            <p>
              From fabric selection to final stitching, our structured process
              keeps comfort, consistency, and finish aligned with premium
              expectations.
            </p>
          </div>
          <ul className="comfort-points">
            <li>Fabric selection aligned to durability and all-day comfort</li>
            <li>Vibrant shades, stylish silhouettes, and trend-aware patterns</li>
            <li>Expert supervision at every stage of production</li>
          </ul>
        </div>
      </section>

      <section className="home-cta">
        <div className="home-shell cta-shell">
          <h2>Looking to purchase from GLAMGO?</h2>
          <p>
            Browse the collection, then connect with our team directly for
            purchase inquiries, product discussions, and business coordination.
          </p>
          <Link to="/purchase" className="essentials-btn">
            Go to Purchase Page
          </Link>
        </div>
      </section>

      <section className="home-about" id="about">
        <div className="home-shell about-shell">
          <div className="about-copy">
            <div className="section-head section-head-left">
              <span>About GLAMGO</span>
              <h2>Crafted for fashion-conscious markets worldwide.</h2>
            </div>

            <div className="about-story">
              {companyStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="about-points">
              {qualityHighlights.map((point) => (
                <div key={point} className="about-point">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual">
            <div className="about-image-panel">
              <img src={whyChooseUsImg} alt="Why choose GLAMGO" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
