import "./styles/app.css";

import { Route, Routes } from "react-router";

import { CartProvider } from "./contexts/cartContext";
import Checkout from "./pages/checkout/checkout";
import { ProductsProvider } from "./contexts/productsContext";
import Shop from "./pages/shop/shop";

export default function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<><h1>404!</h1><h3>Страница не найдена</h3></>} />
        </Routes>
      </ProductsProvider>
    </CartProvider>
  );
}
