import { Link, useParams } from "react-router-dom";
import ProductSizeChart from "../components/ProductSizeChart";
import Seo from "../components/Seo";
import { getProductSizeChart } from "../config/productSizeCharts";
import { absoluteUrl, canonicalUrl, formatPrice } from "../config/site";
import "../styles/productDetails.css";

function ProductDetails({ products = [], isLoading = false }) {
  const { slug } = useParams();

  if (isLoading) {
    return (
      <main className="product-details">
        <Seo
          title="Loading Product | GLAMGO"
          description="Loading product details from the GLAMGO collection."
          path={`/product/${slug || ""}`}
          noindex
        />
        <p className="product-state">Loading product...</p>
      </main>
    );
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <main className="product-details">
        <Seo
          title="Product Not Found | GLAMGO"
          description="The GLAMGO product you are looking for could not be found."
          path={`/product/${slug || ""}`}
          noindex
        />
        <section className="product-missing">
          <h1>Product not found</h1>
          <p>
            This product may be temporarily unavailable. You can browse the
            full collection or contact the team for help.
          </p>
          <div className="product-missing-actions">
            <Link to="/essentials">Browse Collection</Link>
            <Link to="/contact">Contact GLAMGO</Link>
          </div>
        </section>
      </main>
    );
  }

  const productUrl = canonicalUrl(`/product/${product.slug}`);
  const productDescription = `${product.name} by GLAMGO. ${product.description}`;
  const sizeChart = getProductSizeChart(product);

  return (
    <main className="product-details">
      <Seo
        title={`${product.name} | GLAMGO`}
        description={productDescription}
        path={`/product/${product.slug}`}
        image={product.image}
        type="product"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: [absoluteUrl(product.image)],
            description: product.description,
            brand: {
              "@type": "Brand",
              name: "GLAMGO",
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: String(product.price),
              availability: "https://schema.org/InStock",
              url: productUrl,
            },
          })}
        </script>
      </Seo>

      <div className="product-container">
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <h2>{formatPrice(product.price)}</h2>

          <p className="description">{product.description}</p>

          <p className="fabric">
            <strong>Fabric:</strong> {product.fabric}
          </p>

          <ProductSizeChart productName={product.name} chart={sizeChart} />

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
              <Link to={`/purchase?product=${encodeURIComponent(product.name)}`}>
                Purchase
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
