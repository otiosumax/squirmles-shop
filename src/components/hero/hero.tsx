import "./hero.css";

import { forwardRef } from "react";

const Hero = forwardRef<HTMLDivElement, { onButtonClick: () => void }>(
  function Hero(props, ref) {
    const onButtonClick = props.onButtonClick;

    return (
      <div ref={ref} className="hero">
        <h1>
          Самые{/* <br /> */} крутые{/* <br /> */} черви!
        </h1>
        <img
          className="bordered"
          src="https://miro.medium.com/v2/resize:fit:1400/1*4PLAuTlWSED5TYBO_BCzqQ.jpeg"
          alt="ЧЭЭЭЭРВЬ"
        ></img>
        <div>
          <h2>
            Пушистые, цветастые и веселые. Все о них мечтают, но не все
            признаются.
          </h2>
          <div className="shop-and-shipping">
            <button
              className="button"
              onClick={() => {
                onButtonClick();
              }}
            >
              Закупиться
            </button>
            <p>Бесплатная доставка при заказе от $1000!</p>
          </div>
        </div>
      </div>
    );
  },
);

export default Hero;
