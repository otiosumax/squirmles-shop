import "./checkout.css";

import { Link } from "react-router";

export default function Checkout() {
  return (
    <div className="checkout">
      <div className="header">
        <Link className="back-to-shop align-left" to="/">
          &larr; Назад за покупками
        </Link>
        <h1 className="shop-name align-center">Здесь будут черви</h1>
        <p className="align-right">🔐 Безопасная оплата</p>
      </div>
      <div className="progress-stripe">
        <span>выбор</span>
        <i>&rarr;</i>
        <span style={{ color: "var(--primary)" }}>оплата</span>
        <i>&rarr;</i>
        <span>заказ подтвержден</span>
      </div>
      <form className="bordered">
        <h3>Контактная информация</h3>
        <label> Полное имя</label>
        <input />
        <br />
        <label>EMAIL</label>
        <input />
      </form>
    </div>
  );
}
