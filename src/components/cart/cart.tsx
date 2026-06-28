import { useCart } from "../../contents/cartContext";
import { useProducts } from "../../contents/productsContext";
import "./cart.css";

type cartProps = { isOpen: boolean; onClose: () => void };
export default function Cart({ isOpen, onClose }: cartProps) {
  const cart = useCart();
  const products = useProducts();

  return (
    <div className={`cart-container ${isOpen ? "open" : ""}`}>
      <div className="gray-screen" onClick={onClose}></div>

      <div className="cart-panel">
        <h1>Корзина</h1>
        <div className="divider"></div>
        {/* <button onClick={onClose}>Закрыть</button> */}
        <div className="items-in-cart-list">
          {cart.inCart.map((item) => {
            const product = products.productsList.find((p) => p.id === item.id);
            if (!product) return <></>;
            return (
              <div className="item-in-cart-card">
                <img src={product.imageUrl}></img>
                
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
