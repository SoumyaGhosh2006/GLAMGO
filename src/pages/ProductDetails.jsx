import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
            <h4>Select Size</h4>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? "active" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity">
            <h4>Quantity</h4>
            <div className="quantity-controls">
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="actions">
            <button className="add-cart">Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
