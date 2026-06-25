import "./styles/app.css";
import Hero from "./components/hero";
import Collection from "./components/collection";

export default function App() {
  return (
    <>
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
        <h2 className="cart">Корзина</h2>
      </div>
      <Hero />
      <Collection />
    </>
  );
}
