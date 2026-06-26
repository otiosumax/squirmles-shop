import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: string;
  quantity: number;
};

type CartContextType = {
  inCart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
};

// TODO: изучить подробнее

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [inCart, setInCart] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || ""),
  );

  const addToCart = (item: { id: string }) => {
    setInCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prev, { id: item.id, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setInCart((prev) =>
      prev
        .map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(inCart));
  }, [inCart]);
  return (
    <CartContext.Provider value={{ inCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "Привет, я Ошибка! Я не скажу какая и где: дебажь все вслепую.",
    );
  }
  return context;
}
