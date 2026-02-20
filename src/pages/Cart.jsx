import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

function Cart() {
  const {
    cart,
    savedItems,
    removeFromCart,
    updateQuantity,
    saveForLater,
    moveToCart,
    totalAmount,
    cartCount,
  } = useCart();

  return (
    <main className="cart-page">
      <header className="cart-header">
        <h1>Your Cart</h1>
        <p>{cartCount} item(s) ready for checkout</p>
      </header>

      <div className="cart-container">
        <section className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <h3>Your cart is empty</h3>
              <p>Add your favorite items to get started.</p>
            </div>
          ) : (
            cart.map((item) => (
              <article key={item.id + item.size} className="cart-item">
                <img src={item.image} alt={item.name} />

                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="meta">Size: {item.size}</p>
                  <p className="price">&#8377;{item.price}</p>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.size,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.size,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="cart-actions">
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id, item.size)}
                    >
                      Remove
                    </button>

                    <button
                      type="button"
                      className="save-btn"
                      onClick={() => saveForLater(item)}
                    >
                      Save for later
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}

          {savedItems.length > 0 && (
            <section className="saved-section">
              <h2>Saved for Later</h2>
              {savedItems.map((item) => (
                <article key={item.id + item.size} className="cart-item saved-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="meta">Size: {item.size}</p>
                    <p className="price">&#8377;{item.price}</p>
                    <button
                      type="button"
                      className="move-btn"
                      onClick={() => moveToCart(item)}
                    >
                      Move to Cart
                    </button>
                  </div>
                </article>
              ))}
            </section>
          )}
        </section>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items</span>
            <span>{cartCount}</span>
          </div>
          <div className="summary-row">
            <span>Total</span>
            <strong>&#8377;{totalAmount}</strong>
          </div>
          <button
            className="checkout-btn"
            type="button"
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
          <p className="summary-note">
            Shipping and taxes calculated at checkout.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
