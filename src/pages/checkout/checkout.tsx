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
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Иван Охлобыстин"
            />
            <br />
            <label>EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="ivan.ohlobystin@example.com"
            />
          </div>

          <div className="form-block card-padding bordered">
            <h3>📍 Адресс доставки</h3>
            <label>Улица</label>
            <input
              type="text"
              id="street"
              name="street"
              required
              placeholder="Пушкина"
            />
            <br />
            <label>Город</label>
            <input
              type="text"
              id="city"
              name="city"
              required
              placeholder="Пушкин"
            />
            <br />
            <label>Почтовый индекс</label>
            <input
              type="text"
              id="zip"
              name="zip"
              required
              placeholder="666666"
            />
          </div>

          <div className="form-block card-padding bordered">
            <h3>📬 Способ доставки</h3>
            <div>
              <input
                type="radio"
                id="standard"
                name="shipping"
                value="standard"
                defaultChecked
              />
              <label htmlFor="standard">Стандартная доставка (3-5 дней)</label>
            </div>
            <div>
              <input
                type="radio"
                id="express"
                name="shipping"
                value="express"
              />
              <label htmlFor="express">Экспресс доставка (1-2 дня)</label>
            </div>
          </div>

          <div className="form-block card-padding bordered">
            <h3>💳 Платежная информация</h3>
            <div>
              <label>Номер карты</label>
              <input type="text" id="cardNumber" name="cardNumber" required />
            </div>
            <div>
              <label>Срок действия</label>
              <input type="text" id="expiryDate" name="expiryDate" required />
            </div>
            <div>
              <label>CVV</label>
              <input type="text" id="cvv" name="cvv" required />
            </div>
          </div>
        </div>
        <div className="order">
          <OrderSummary />
          <button className="button bordered">🤑 Подтвердить заказ</button>
        </div>
      </form>
    </div>
  );
}
