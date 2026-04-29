import { Link, useParams } from "react-router-dom";
import "../styles/productDetails.css";

function ProductDetails({ products = [], isLoading = false }) {
  const { id } = useParams();

  if (!products.length) {
    return (
      <main className="product-details">
        <p className="product-state">
          {isLoading ? "Loading products..." : "No products available right now."}
        </p>
      </main>
    );
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <h2 style={{ padding: "60px", textAlign: "center" }}>
        Product Not Found
      </h2>
    );
  }

  return (
    <main className="product-details">
      <div className="product-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
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
              <p className="size-fallback">Size details available on request.</p>
            )}
          </div>

          <div className="purchase-panel">
            <h3>Purchase this product</h3>
            <p>
              Continue to the purchase page for contact details, the write to
              us form, and the live office location.
            </p>
            <div className="purchase-panel-actions">
              <Link to={`/purchase?product=${encodeURIComponent(product.name)}`}>
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
