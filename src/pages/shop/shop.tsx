import "../../styles/app.css";
import "./shop.css";

import { useRef, useState } from "react";

import About from "../../components/about/about";
import Cart from "../../components/cart/cart";
import { CartProvider } from "../../contexts/cartContext";
import Collection from "../../components/collection/collection";
import Footer from "../../components/footer/footer";
import Hero from "../../components/hero/hero";
import QnA from "../../components/qna/qna";

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
        <div className="layout header">
          <div className="logo-container align-left">
            <div className="logo">
              <img
                src="/squirmle.png"
                alt="Logo"
                style={{ aspectRatio: "1/1", height: "48px" }}
              />
            </div>
            <h1>Здесь будут черви</h1>
          </div>
          <div className="menu align-center">
            <p onClick={() => scrollToSection("hero")}>Вверх</p>
            <p onClick={() => scrollToSection("shop")}>Магазин</p>
            <p onClick={() => scrollToSection("qna")}>ЧаВо</p>
          </div>
          <button
            className="button align-right"
            onClick={() => {
              setIsCartOpen(true);
            }}
          >
            Корзина
          </button>
        </div>
        <div>
          <Hero
            ref={getRef("hero")}
            onButtonClick={() => scrollToSection("shop")}
          />

          <Collection ref={getRef("shop")} />

          <About ref={getRef("about")} />

          <QnA ref={getRef("qna")} />

          <div className="divider" />
          <Footer />

          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </div>
    </CartProvider>
  );
}
