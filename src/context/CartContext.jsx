import { createContext, useContext, useState, useMemo, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // ================= LOAD FROM LOCAL STORAGE =================
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("glamgo_cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [savedItems, setSavedItems] = useState(() => {
    const stored = localStorage.getItem("glamgo_saved");
    return stored ? JSON.parse(stored) : [];
  });

  // ================= SAVE TO LOCAL STORAGE =================
  useEffect(() => {
    localStorage.setItem("glamgo_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("glamgo_saved", JSON.stringify(savedItems));
  }, [savedItems]);

  // ================= ADD TO CART =================
  const addToCart = (product, size, quantity) => {
    if (!size) return;

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity,
        },
      ];
    });
  };

  // ================= REMOVE ITEM =================
  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // ================= UPDATE QUANTITY (0 → REMOVE) =================
  const updateQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, size);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // ================= SAVE FOR LATER =================
  const saveForLater = (item) => {
    setSavedItems((prev) => [...prev, item]);
    removeFromCart(item.id, item.size);
  };

  const moveToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (i) => i.id === item.id && i.size === item.size
      );

      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prevCart, item];
    });

    setSavedItems((prev) =>
      prev.filter(
        (i) => !(i.id === item.id && i.size === item.size)
      )
    );
  };

  // ================= DERIVED VALUES =================
  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const totalAmount = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        savedItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        saveForLater,
        moveToCart,
        cartCount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
