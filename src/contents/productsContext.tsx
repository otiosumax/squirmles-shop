import { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../models/cardData";

type ProductsContextType = {
  productsList: Product[];
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [productsList, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/sample.json")
      .then((response) => response.json())
      .then((data) => setProducts(data || []))
      .catch(() =>
        console.error(
          "Привет, я Ошибка! Я не скажу какая и где: дебажь все вслепую.",
        ),
      );
  });

  return (
    <ProductsContext.Provider value={{ productsList }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error(
      "Привет, я Ошибка! Я не скажу какая и где: дебажь все вслепую.",
    );
  return context;
}
