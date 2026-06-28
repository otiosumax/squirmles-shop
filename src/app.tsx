import "./styles/app.css";
import Shop from "./pages/shop/shop";
import { CartProvider } from "./contents/cartContext";
import { ProductsProvider } from "./contents/productsContext";

export default function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <Shop />
      </ProductsProvider>
    </CartProvider>
  );
}
