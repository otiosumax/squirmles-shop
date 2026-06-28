import "./styles/app.css";
import Shop from "./pages/shop/shop";
import { CartProvider } from "./contexts/cartContext";
import { ProductsProvider } from "./contexts/productsContext";

export default function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <Shop />
      </ProductsProvider>
    </CartProvider>
  );
}
