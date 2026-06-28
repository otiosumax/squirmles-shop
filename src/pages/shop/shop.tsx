import "../../styles/app.css";
import "./shop.css";
import Hero from "../../components/hero/hero";
import Collection from "../../components/collection/collection";
import { CartProvider } from "../../contexts/cartContext";
import { useRef, useState } from "react";
import Cart from "../../components/cart/cart";

export default function Shop() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const scrollTargets = useRef<Map<string, HTMLDivElement | null>>(new Map());

  const getRef = (key: string) => {
    return (element: HTMLDivElement | null) => {
      if (element) {
        scrollTargets.current.set(key, element);
      } else {
        scrollTargets.current.delete(key);
      }
    };
  };

  const scrollToSection = (key: string) => {
    const target = scrollTargets.current.get(key);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <CartProvider>
      <div className="shop">
        <div className="header">
          <div className="logo-container">
            <div className="logo">logo</div>
            <h1>Здесь будут черви</h1>
          </div>
          <div className="menu">
            <p onClick={() => scrollToSection("hero")}>Вверх</p>
            <p onClick={() => scrollToSection("shop")}>Магазин</p>
            {/* <p onClick={() => scrollToSection("qna")}>ЧаВо</p> */}
          </div>
          <button
            className="cart-button"
            onClick={() => {
              setIsCartOpen(true);
            }}
          >
            Корзина
          </button>
        </div>

        <Hero ref={getRef("hero")} onButtonClick={() => scrollToSection("shop")}/>
        <Collection ref={getRef("shop")} />

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </CartProvider>
  );
}
