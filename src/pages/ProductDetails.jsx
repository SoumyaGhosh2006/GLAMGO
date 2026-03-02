import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();

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
          <h2>Rs. {product.price}</h2>

          <p className="description">{product.description}</p>
          <p className="fabric">
            <strong>Fabric:</strong> {product.fabric}
          </p>

          <div className="sizes">
            <h4>Available Sizes</h4>
            <div className="size-options">
              {product.sizes.map((size) => (
                <span key={size} className="size-chip">
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
