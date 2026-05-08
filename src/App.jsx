import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToHash from "./components/ScrollToHash";
import {
  getProducts,
  normalizeProducts,
  subscribeToProductUpdates,
} from "./lib/getProducts";

const Contact = lazy(() => import("./pages/Contact"));
const Essentials = lazy(() => import("./pages/Essentials"));
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

function App() {
  const [productState, setProductState] = useState({
    products: [],
    isLoading: true,
    error: null,
    source: "loading",
  });

  useEffect(() => {
    let isActive = true;
    let subscription = null;

    async function loadProducts() {
      try {
        const result = await getProducts();

        if (!isActive) return;

        setProductState({
          products: result.products,
          isLoading: false,
          error: result.error,
          source: result.source,
        });

        subscription = subscribeToProductUpdates((payload) => {
          setProductState((prev) => ({
            ...prev,
            products: mergeRealtimeProduct(prev.products, payload),
          }));
        });
      } catch (error) {
        if (!isActive) return;

        setProductState({
          products: [],
          isLoading: false,
          error,
          source: "failed",
        });
      }
    }

    loadProducts();

    return () => {
      isActive = false;

      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Navbar />
        <ScrollToHash />

        <Suspense fallback={<p className="route-loading">Loading page...</p>}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  products={productState.products}
                  isLoading={productState.isLoading}
                />
              }
            />
            <Route
              path="/essentials"
              element={
                <Essentials
                  products={productState.products}
                  isLoading={productState.isLoading}
                  productError={productState.error}
                  productSource={productState.source}
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/purchase" element={<Contact />} />
            <Route
              path="/product/:slug"
              element={
                <ProductDetails
                  products={productState.products}
                  isLoading={productState.isLoading}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

function mergeRealtimeProduct(products, payload) {
  if (!payload?.eventType) {
    return products;
  }

  if (payload.eventType === "DELETE") {
    return products.filter((product) => product.id !== payload.old?.id);
  }

  const [updatedProduct] = normalizeProducts([payload.new]);

  if (!updatedProduct) {
    return products;
  }

  const exists = products.some((product) => product.id === updatedProduct.id);

  if (!exists) {
    return [updatedProduct, ...products];
  }

  return products.map((product) =>
    product.id === updatedProduct.id
      ? { ...product, ...updatedProduct }
      : product,
  );
}

export default App;
