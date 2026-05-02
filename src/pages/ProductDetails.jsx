import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../styles/productDetails.css";

function ProductDetails({ products = [], isLoading = false }) {
  const { slug } = useParams();

  // 🔥 Handle loading state properly
  if (isLoading) {
    return (
      <main className="product-details">
        <p className="product-state">Loading product...</p>
      </main>
    );
  }

  // 🔥 Find product by slug (safe check)
  const product = products.find((p) => p.slug === slug);

  // ❌ If still not found AFTER loading
  if (!product) {
    return (
      <main className="product-details">
        <h2 style={{ padding: "60px", textAlign: "center" }}>
          Product Not Found
        </h2>
      </main>
    );
  }

  return (
    <main className="product-details">
      
      {/* 🔥 SEO + Open Graph */}
      <Helmet>
        <title>{product.name} | GLAMGO</title>

        <meta
          name="description"
          content={`${product.name} for ₹${product.price}. Premium comfort and quality by GLAMGO.`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} | GLAMGO`} />
        <meta
          property="og:description"
          content={`${product.name} available for ₹${product.price}.`}
        />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />

        {/* 🔥 EXTRA SEO (important) */}
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="product-container">
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <h2>₹{product.price}</h2>

          <p className="description">{product.description}</p>

          <p className="fabric">
            <strong>Fabric:</strong> {product.fabric}
          </p>

          <div className="sizes">
            <h4>Available Sizes</h4>

            {product.sizes?.length ? (
              <div className="size-options">
                {product.sizes.map((size) => (
                  <span key={size} className="size-chip">
                    {size}
                  </span>
                ))}
              </div>
            ) : (
              <p className="size-fallback">
                Size details available on request.
              </p>
            )}
          </div>

          <div className="purchase-panel">
            <h3>Purchase this product</h3>

            <p>
              Continue to the purchase page for contact details and ordering.
            </p>

            <div className="purchase-panel-actions">
              <Link
                to={`/purchase?product=${encodeURIComponent(product.name)}`}
              >
                Purchase?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;