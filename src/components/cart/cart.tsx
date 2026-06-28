import "./cart.css";

import { useEffect, useState } from "react";
import { useCart } from "../../contexts/cartContext";
import { useProducts } from "../../contexts/productsContext";
import type { Product } from "../../models/cardData";

type cartProps = { isOpen: boolean; onClose: () => void };

function CartItemCard({ item }: { item: Product }) {
  const cart = useCart();
  const itemId = item.id;
  const [inCartItemQuantity, setInCartItemQuantity] = useState<number>(0);

  useEffect(() => {
    setInCartItemQuantity(
      cart.inCart.find((cartItem) => {
        return cartItem.id === itemId;
      })?.quantity || 0,
    );
  }, [cart.inCart.find((i) => i.id === itemId)?.quantity]);

  return (
    <>
      {inCartItemQuantity != 0 && (
        <div className="item-in-cart-card bordered">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src={item.imageUrl}></img>
            <div>
              <h2>{item.name}</h2>
              <p className="price">${item.price * inCartItemQuantity}</p>
            </div>
          </div>
          <div className="in-cart-quantity">
            <button
              style={{
                borderColor: item.color,
                borderRadius: "1000px 0 0 1000px",
              }}
              onClick={() => {
                cart.removeFromCart(itemId);
              }}
            >
              -
            </button>
            <span style={{ borderColor: item.color }}>
              {inCartItemQuantity}
            </span>
            <button
              style={{
                borderColor: item.color,
                borderRadius: "0 1000px 1000px 0",
              }}
              onClick={() => {
                cart.addToCart({ id: itemId, quantity: 1 });
              }}
            >
              +
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function Cart({ isOpen, onClose }: cartProps) {
  const cart = useCart();
  const products = useProducts();
  const total = cart.inCart
    .reduce((total, item) => {
      return (
        total +
        (products.productsList.find((p) => p.id === item.id)?.price || 0) *
          item.quantity
      );
    }, 0)
    .toFixed(2);

  return (
    <div className={`cart-container ${isOpen ? "open" : ""}`}>
      <div className="gray-screen" onClick={onClose}></div>

      <div className="cart-panel">
        <h1>Корзина</h1>
        <div className="divider"></div>
        <div className="items-in-cart-list">
          {cart.inCart.map((item) => {
            const product = products.productsList.find((p) => p.id === item.id);
            if (!product) return null;
            return <CartItemCard key={item.id} item={product} />;
          })}
        </div>
        <div className="payment">
          <div className="divider" />
          <div className="payment-flex">
            <div>
              <p>Сумма заказа:</p>
              <h1>${total}</h1>
            </div>
            <button>Оплатить</button>
          </div>
        </div>
      </div>
    </div>
  );
}
