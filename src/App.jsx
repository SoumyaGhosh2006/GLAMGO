import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home";
import Essentials from "./pages/Essentials";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import { getProducts, subscribeToProductUpdates } from "./lib/getProducts";

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

        // 🔄 REALTIME LISTENER
        subscription = subscribeToProductUpdates((updatedProduct) => {
          console.log("LIVE UPDATE RECEIVED");

          setProductState((prev) => ({
            ...prev,
            products: prev.products.map((p) =>
              p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p,
            ),
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

      // 🧹 cleanup realtime subscription
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToHash />

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
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
