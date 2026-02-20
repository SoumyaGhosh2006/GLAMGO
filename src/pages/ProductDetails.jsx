import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext"; // 👈 import cart hook
import "../styles/productDetails.css";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams(); // Get product id from URL
  const navigate = useNavigate(); // Used for Buy Now redirect
  const { addToCart } = useCart(); // Access cart function

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

  // ================= ADD TO CART HANDLER =================

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart(product, selectedSize, quantity);
    toast.success("Added to cart!");
  };

  // ================= BUY NOW HANDLER =================
  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }

    addToCart(product, selectedSize, quantity);

    // Redirect user to cart page immediately
    navigate("/cart");
  };

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

          {/* ================= SIZE SELECTOR ================= */}
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

          {/* ================= QUANTITY SELECTOR ================= */}
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

          {/* ================= ACTION BUTTONS ================= */}
          <div className="actions">
            <button className="add-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
