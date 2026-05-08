import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { absoluteUrl, formatPrice, siteMeta } from "../config/site";
import "../styles/home.css";

import vestImg from "../assets/optimized/collections/Vest.jpg";
import tshirtImg from "../assets/optimized/collections/TShirt.jpg";
import bermudaImg from "../assets/optimized/collections/Buddy Mercerised Printed Bermuda.jpg";
import trackpantsImg from "../assets/optimized/collections/Track Pant.jpg";
import boxerImg from "../assets/optimized/collections/Boxer.jpg";
import rosyPantyImg from "../assets/optimized/collections/Rosy Panty.jpg";
import whyChooseUsImg from "../assets/why_choose_us.png";

function Home({ products = [], isLoading = false }) {
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
        "Every stitch is supervised. From fabric selection to final finish, our quality team oversees each stage.",
    },
    {
      number: "02",
      title: "Feel",
      description:
        "Comfort is not a feature - it is the foundation. Softness, breathability, and fit come first.",
    },
    {
      number: "03",
      title: "Value",
      description:
        "Premium quality should stay accessible without sacrificing standards.",
    },
  ];

  const aboutStats = [
    { value: "3", label: "Core categories" },
    { value: "100%", label: "Quality supervised" },
    { value: "All", label: "Style possibilities" },
  ];

  const collections = [
    {
      name: "Vests",
      subtitle: "Breathable all-day layers",
      image: vestImg,
      target: "/essentials#vests",
      categories: ["Vests"],
    },
    {
      name: "Round Neck Tees",
      subtitle: "Soft cotton structure",
      image: tshirtImg,
      target: "/essentials#t-shirts",
      categories: ["T-Shirts"],
    },
    {
      name: "Bermuda Shorts",
      subtitle: "Relaxed fit for movement",
      image: bermudaImg,
      target: "/essentials#bermuda",
      categories: ["Bermuda"],
    },
    {
      name: "Track Pants",
      subtitle: "Clean silhouette, easy stretch",
      image: trackpantsImg,
      target: "/essentials#track-pants",
      categories: ["Track Pants"],
    },
    {
      name: "Men's Innerwear",
      subtitle: "Core support styles for everyday wear",
      image: boxerImg,
      target: "/essentials#mens-innerwear",
      categories: ["Innerwear"],
    },
    {
      name: "Girls Innerwear",
      subtitle: "Soft essentials designed for daily comfort",
      image: rosyPantyImg,
      target: "/essentials#girls-innerwear",
      categories: ["Panties", "Girls Innerwear"],
    },
  ];

  const collectionCards = collections.map((collection) => {
    const matchingProducts = products.filter((product) =>
      collection.categories.includes(product.category),
    );

    const validPrices = matchingProducts
      .map((product) => Number(product.price))
      .filter((price) => Number.isFinite(price) && price > 0);

    const lowestPrice =
      validPrices.length > 0 ? Math.min(...validPrices) : null;

    const featuredProduct = matchingProducts[0];

    return {
      ...collection,
      image: featuredProduct?.image || collection.image,
      price: lowestPrice,
    };
  });

  return (
    <>
      <Seo
        title="GLAMGO | Premium Innerwear & Everyday Essentials"
        description="GLAMGO offers premium innerwear, sportswear, vests, track pants, and everyday essentials crafted for comfort, durability, and modern style."
        path="/"
      >
        <meta
          name="keywords"
          content="GLAMGO, premium innerwear, sportswear, vest, track pant, undergarments, essentials"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteMeta.name,
            url: siteMeta.url,
            logo: absoluteUrl("/logo1.png"),
            contactPoint: {
              "@type": "ContactPoint",
              email: siteMeta.email,
              contactType: "sales",
              areaServed: "IN",
              availableLanguage: ["en"],
            },
          })}
        </script>
      </Seo>

      <main className="home-page">
        <section className="home-hero">
          <div className="home-shell hero-shell">
            <div className="hero-content">
              <span className="hero-eyebrow">
                International Quality Standards
              </span>

              <h1>
                Premium undergarments,
                <br />
                sportswear, and <span>jeans built to perform.</span>
              </h1>

              <p className="hero-subtitle">
                GLAMGO blends superior craftsmanship, fashion-forward design,
                and comfort-first construction to serve modern lifestyles with
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
                Every product is shaped by rigorous quality control,
                trend-aware design, and pricing that keeps premium
                manufacturing competitive.
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
              <span>Product Classification</span>

              <h2>
                Browse by section and jump straight to the right range
              </h2>
            </div>

            {!products.length && isLoading ? (
              <p className="products-state">Loading products...</p>
            ) : (
              <div className="collection-grid">
                {collectionCards.map((item) => (
                  <Link
                    to={item.target}
                    key={item.name}
                    className="collection-card"
                  >
                    <div className="collection-image-wrap">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="collection-body">
                      <h3>{item.name}</h3>

                      <p>{item.subtitle}</p>

                      {item.price ? (
                        <strong className="collection-price">
                          From {formatPrice(item.price)}
                        </strong>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="home-comfort-strip">
          <div className="home-shell comfort-shell">
            <div className="comfort-content">
              <span>Quality-First Manufacturing</span>

              <h2>
                Every detail is checked before it reaches your market.
              </h2>

              <p>
                From fabric selection to final stitching, our structured process
                keeps comfort, consistency, and finish aligned with premium
                expectations.
              </p>
            </div>

            <ul className="comfort-points">
              <li>
                Fabric selection aligned to durability and all-day comfort
              </li>

              <li>
                Vibrant shades, stylish silhouettes, and trend-aware patterns
              </li>

              <li>
                Expert supervision at every stage of production
              </li>
            </ul>
          </div>
        </section>

        <section className="home-cta">
          <div className="home-shell cta-shell">
            <h2>Looking to purchase from GLAMGO?</h2>

            <p>
              Browse the collection, then connect with our team directly for
              purchase inquiries and business coordination.
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
                looking sharp and feeling free.
              </p>

              <div className="about-tags">
                {aboutTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className="about-pillars">
                {aboutPillars.map((pillar) => (
                  <div key={pillar.number} className="about-pillar">
                    <span className="about-pillar-number">
                      {pillar.number}
                    </span>

                    <h3>{pillar.title}</h3>

                    <p>{pillar.description}</p>
                  </div>
                ))}
              </div>

              <blockquote className="about-quote">
                "Most brands ask you to pay more for quality. We ask you to
                expect both."
              </blockquote>

              <div className="about-stats">
                {aboutStats.map((stat) => (
                  <div key={stat.label} className="about-stat">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>

              <Link to="/essentials" className="about-link">
                Explore the range
              </Link>
            </div>

            <div className="about-visual">
              <div className="about-image-panel">
                <img
                  src={whyChooseUsImg}
                  alt="Why choose GLAMGO"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
