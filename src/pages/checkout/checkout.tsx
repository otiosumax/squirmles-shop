import "./checkout.css";

import { Link } from "react-router";
import OrderSummary from "../../components/orderSummary/orderSummary";

export default function Checkout() {
  return (
    <div className="checkout">
      <div className="layout header">
        <Link className="back-to-shop align-left" to="/">
          &larr; Назад за покупками
        </Link>
        <h1 className="shop-name align-center">Здесь будут черви</h1>
        <p className="safe-payment align-right">🔐 Безопасная оплата</p>
      </div>
      <div className="progress-stripe layout">
        <span>выбор</span>
        <i>&rarr;</i>
        <span style={{ color: "var(--primary)" }}>оплата</span>
        <i>&rarr;</i>
        <span>заказ подтвержден</span>
      </div>
      <form className="layout form-layout">
        <div className="form-inputs">
          <div className="form-block card-padding bordered">
            <h3>👤 Контактная информация</h3>
            <label> Полное имя</label>
            <input type="text" id="name" name="name" required />
            <br />
            <label>EMAIL</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-block card-padding bordered">
            <h3>📍 Адресс доставки</h3>
            <label>Улица</label>
          </div>
        </div>
        <div className="order">
          <OrderSummary />
          <button className="button bordered">Подтвердить заказ</button>
        </div>
      </form>
    </div>
  );
}
