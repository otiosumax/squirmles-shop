import "./checkoutPopup.css";

import { Link } from "react-router";

type CheckoutPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CheckoutPopup({ isOpen, onClose }: CheckoutPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="checkout-popup">
      <div className="popup-overlay" onClick={onClose} />
      <div className="popup-panel bordered">
        <h2>✅ Заказ подтверждён</h2>
        <p>Спасибо за покупку! Детали заказа отправлены на вашу почту.</p>
        <Link className="button" to="/" onClick={onClose}>
          Вернуться в магазин
        </Link>
      </div>
    </div>
  );
}

export default CheckoutPopup;
