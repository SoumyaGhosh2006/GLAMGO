import { Link } from "react-router-dom";
import { products } from "../data/products";
import "../styles/essentials.css";

function Essentials() {
  return (
    <main className="essentials-page">
      <section className="essentials-header">
        <h1>Everyday Essentials</h1>
        <p>
          Premium basics designed for comfort, movement, and everyday living.
        </p>
      </section>

      <section className="essentials-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-card-link">
              <img src={product.image} alt={product.name} />
            </Link>

            <div className="product-card-body">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span>{product.fabric}</span>
            </div>

            <div className="product-card-actions">
              <Link to={`/product/${product.id}`} className="product-action detail">
                View Details
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Essentials;
