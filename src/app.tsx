import "./styles/app.css";
import Hero from "./components/hero/hero";
import Collection from "./components/collection/collection";
import { CartProvider } from "./contents/cartContext";

export default function App() {
  return (
    <CartProvider>
      <div className="header">
        <div className="logo-container">
          <div className="logo">logo</div>
          <h1>Здесь будут черви</h1>
        </div>
        <div className="menu">
          <p>Магазин</p>
          <p>О нас</p>
          <p>ЧаВо</p>
        </div>
        <button className="cart">Корзина</button>
      </div>
      <Hero />
      <Collection />
    </CartProvider>
  );
}
