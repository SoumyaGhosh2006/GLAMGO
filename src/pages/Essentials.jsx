import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { formatPrice } from "../config/site";
import "../styles/essentials.css";

function Essentials({
  products = [],
  isLoading = false,
  productError = null,
  productSource = "loading",
}) {
  const productSections = [
    {
      id: "vests",
      title: "Vests",
      label: "Menswear",
      description: "Breathable foundational layers built for all-day wear.",
      categories: ["Vests"],
    },
    {
      id: "t-shirts",
      title: "Round Neck Tees",
      label: "Menswear",
      description:
        "Soft structured tees designed for casual movement and clean styling.",
      categories: ["T-Shirts"],
    },
    {
      id: "bermuda",
      title: "Bermuda Shorts",
      label: "Sportswear",
      description: "Relaxed shorts with premium construction and easy comfort.",
      categories: ["Bermuda"],
    },
    {
      id: "track-pants",
      title: "Track Pants",
      label: "Sportswear",
      description:
        "Performance-ready essentials with stretch, polish, and comfort.",
      categories: ["Track Pants"],
    },
    {
      id: "mens-innerwear",
      title: "Men's Innerwear",
      label: "Undergarments",
      description:
        "Supportive core styles crafted for softness, fit, and dependable wear.",
      categories: ["Innerwear"],
    },
    {
      id: "girls-innerwear",
      title: "Girls & Women's Innerwear",
      label: "Girls Collection",
      description:
        "Soft, lightweight everyday essentials made for comfort-first wear.",
      categories: ["Panties", "Girls Innerwear"],
    },
  ];

  return (
    <main className="essentials-page">
      <Seo
        title="Essentials | GLAMGO"
        description="Explore GLAMGO essentials including vests, round neck tees, track pants, bermuda shorts, and innerwear."
        path="/essentials"
      />

      <section className="essentials-header">
        <h1>Everyday Essentials</h1>
        <p>
          Explore the collection by classification and jump directly into the
          section you need.
        </p>
        {productError && products.length ? (
          <p className="products-helper">
            Showing saved products while the live catalog reconnects.
          </p>
        ) : null}
        {productSource === "missing-config" ? (
          <p className="products-helper">
            Showing local catalog until Supabase environment values are
            available.
          </p>
        ) : null}
      </section>

      {!products.length ? (
        <p className="products-state">
          {isLoading
            ? "Loading products..."
            : "No products available right now."}
        </p>
      ) : (
        <>
          <section
            className="classification-nav"
            aria-label="Product classifications"
          >
            {productSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="classification-chip"
              >
                {section.title}
              </a>
            ))}
          </section>

          <div className="essentials-sections">
            {productSections.map((section) => {
              const sectionProducts = products.filter((product) =>
                section.categories.includes(product.category),
              );

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="category-section"
                >
                  <div className="category-section-head">
                    <span>{section.label}</span>
                    <h2>{section.title}</h2>
                    <p>{section.description}</p>
                  </div>

                  {sectionProducts.length ? (
                    <div className="essentials-grid">
                      {sectionProducts.map((product) => (
                        <article key={product.id} className="product-card">
                          <Link
                            to={`/product/${product.slug}`}
                            className="product-card-link"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              loading="lazy"
                              decoding="async"
                            />
                          </Link>

                          <div className="product-card-body">
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <strong className="product-price">
                              {formatPrice(product.price)}
                            </strong>
                            <span>{product.fabric}</span>
                          </div>

                          <div className="product-card-actions">
                            <Link
                              to={`/product/${product.slug}`}
                              className="product-action detail"
                            >
                              View Details
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p className="products-state section-empty">
                      Products for this section will be updated soon.
                    </p>
                  )}
                </section>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}

export default Essentials;
