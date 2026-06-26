import "./hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <h1>
        Самые
        <br />
        крутые
        <br />
        черви!
      </h1>
      <div>картинку бы сюда</div>
      <div>
        <h2>
          Пушистые, цветастые и веселые. Все о них мечтают, но не все
          признаются.
        </h2>
        <div className="shop-and-shipping">
          <button className="shop-button">Закупиться</button>
          <p>Бесплатная доставка при заказе от 1000$!</p>
        </div>
      </div>
    </div>
  );
}
