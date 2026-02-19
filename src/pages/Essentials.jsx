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
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="product-card"
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <span>{product.fabric}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Essentials;
