import { useId } from "react";
import "../styles/productSizeChart.css";

function ProductSizeChart({ productName, chart, isLoading = false }) {
  const titleId = useId();
  const hasChart = Boolean(chart?.sizes?.length && chart?.rows?.length);
  const sectionTitle = productName ? `${productName} size chart` : "Size chart";
  const caption = productName
    ? `${productName} chest size chart in centimeters and inches.`
    : "Chest size chart in centimeters and inches.";

  return (
    <section
      className={`product-size-chart${isLoading ? " is-loading" : ""}`}
      aria-labelledby={titleId}
    >
      <div className="product-size-chart__header">
        <h3 id={titleId}>{sectionTitle}</h3>
        <p>Find your best fit with chest measurements in centimeters and inches.</p>
      </div>

      {isLoading ? (
        <div
          className="product-size-chart__state"
          aria-live="polite"
          aria-busy="true"
        >
          Loading size chart...
        </div>
      ) : hasChart ? (
        <div
          className="product-size-chart__table-wrap"
          tabIndex={0}
          aria-label={`${sectionTitle} table`}
        >
          <table className="product-size-chart__table">
            <caption className="sr-only">{caption}</caption>
            <thead>
              <tr>
                <th scope="col">Size</th>
                {chart.sizes.map((size) => (
                  <th key={size} scope="col">
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((value) => (
                    <td key={`${row.label}-${value}`}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="product-size-chart__state" aria-live="polite">
          Size chart unavailable
        </p>
      )}
    </section>
  );
}

export default ProductSizeChart;
