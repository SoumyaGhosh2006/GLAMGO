import { Link } from "react-router-dom";
import "../styles/home.css";

import vestImg from "../assets/collections/Vest.png";
import tshirtImg from "../assets/collections/TShirt.png";
import bermudaImg from "../assets/collections/Buddy Mercerised Printed Bermuda.png";
import trackpantsImg from "../assets/collections/Track Pant.png";
import whyChooseUsImg from "../assets/why_choose_us.png";

function Home() {
  const aboutTags = [
    "International Quality",
    "Premium Comfort",
    "Fashion-Forward",
  ];

  const aboutPillars = [
    {
      number: "01",
      title: "Craft",
      description:
        "Every stitch is supervised. From fabric selection to final finish, our quality team oversees each stage - not as a checkbox, but as a commitment.",
    },
    {
      number: "02",
      title: "Feel",
      description:
        "Comfort isn't a feature - it's the foundation. We engineer softness, breathability, and fit before we even think about aesthetics.",
    },
    {
      number: "03",
      title: "Value",
      description:
        "World-class doesn't have to mean unaffordable. We make premium accessible - without cutting corners or lowering standards.",
    },
  ];

  const aboutStats = [
    { value: "3", label: "Core categories" },
    { value: "100%", label: "Quality supervised" },
    { value: "\u221E", label: "Style possibilities" },
  ];

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
              <span>Premium Apparel - Worldwide</span>
              <h2>Wear what you mean.</h2>
            </div>

            <p className="about-intro">
              GLAMGO builds clothes for people who refuse to choose between
              looking sharp and feeling free. Premium undergarments,
              performance sportswear, and tailored denim - crafted to
              world-class standards, priced for the real world.
            </p>

            <div className="about-tags">
              {aboutTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="about-pillars">
              {aboutPillars.map((pillar) => (
                <div key={pillar.number} className="about-pillar">
                  <span className="about-pillar-number">{pillar.number}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              ))}
            </div>

            <blockquote className="about-quote">
              "Most brands ask you to pay more for quality. We ask you to
              expect both - and then we deliver."
            </blockquote>

            <p className="about-story">
              At GLAMGO, quality policy isn't a document on a wall. It's the
              culture of our floor. Our expert quality controllers are embedded
              at every stage of production - because we know that trust is
              built in the details your customers never even notice. The seam
              that holds. The color that doesn't fade. The waistband that
              doesn't roll. That's GLAMGO.
            </p>

            <div className="about-stats">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="about-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <p className="about-closing">
              Style that fits your life - not just your size.
            </p>

            <Link to="/essentials" className="about-link">
              Explore the range &#8599;
            </Link>

            <p className="about-signoff">
              <strong>Glamgo</strong>
              <span>Style meets comfort - uncompromised.</span>
            </p>
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
