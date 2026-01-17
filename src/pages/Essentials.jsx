import "../styles/essentials.css";

import vestImg from "../assets/collections/vest.png";
import tshirtImg from "../assets/collections/tshirt.png";
import bermudaImg from "../assets/collections/bermuda.png";
import trackpantsImg from "../assets/collections/trackpants.png";

function Essentials() {
  return (
    <main className="essentials-page">
      {/* ===== Header ===== */}
      <section className="essentials-header">
        <h1>Everyday Essentials</h1>
        <p>
          Premium basics designed for comfort, movement, and everyday living.
        </p>
      </section>

      {/* ===== Filters ===== */}
      <section className="essentials-filters">
        <button className="active">All</button>
        <button>Vests</button>
        <button>T-Shirts</button>
        <button>Bermuda</button>
        <button>Track Pants</button>
      </section>

      {/* ===== Product Grid ===== */}
      <section className="essentials-grid">
        <div className="product-card">
          <img src={vestImg} alt="Vests" />
          <h3>Premium Vests</h3>
          <span>Cotton • Breathable</span>
        </div>

        <div className="product-card">
          <img src={tshirtImg} alt="T-Shirts" />
          <h3>Round Neck Tees</h3>
          <span>Soft Knit • Everyday Fit</span>
        </div>

        <div className="product-card">
          <img src={bermudaImg} alt="Bermuda Shorts" />
          <h3>Bermuda Shorts</h3>
          <span>Relaxed • Summer Wear</span>
        </div>

        <div className="product-card">
          <img src={trackpantsImg} alt="Track Pants" />
          <h3>Track Pants</h3>
          <span>Flexible • All-Day Comfort</span>
        </div>
      </section>
    </main>
  );
}

export default Essentials;
