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
          <button>Магазин</button>
          <button>О нас</button>
          <button>ЧаВо</button>
        </div>
        <button className="cart">Корзина</button>
      </div>
      <Hero />
      <Collection />
    </>
  );
}
