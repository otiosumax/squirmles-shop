import "./orderSummary.css";

import type { Product } from "../../models/product";
import { useCart } from "../../contexts/cartContext";
import { useProducts } from "../../contexts/productsContext";

function SummaryItemCard({
  item,
  quantity,
}: {
  item: Product;
  quantity: number;
}) {
  return (
    <div className="summary-item-card card-padding">
      <img src={item.imageUrl} alt={item.name} />
      <div>
        <h4>{item.name}</h4>
        <p>кол-во: {quantity}</p>
      </div>
      <p className="summary-item-name">${item.price * quantity}</p>
    </div>
  );
}

export default function OrderSummary() {
  const cart = useCart();
  const products = useProducts();

  // 🔥 Проверка на загрузку
  if (!products.productsList || products.productsList.length === 0) {
    return (
      <div className="bordered order-summary">
        <div className="summary-header card-padding">
          <span>Заказ</span>
          <span>0 шт.</span>
        </div>
        <div className="card-padding">Загрузка корзины...</div>
      </div>
    );
  }

  const getProductById = (id: string) =>
    products.productsList.find((product) => String(id) === String(product.id));

  // 🔥 Фильтруем корзину от невалидных товаров
  const validCartItems = cart.inCart.filter((item) => getProductById(item.id));

  const total = validCartItems.reduce((total, item) => {
    const product = getProductById(item.id);
    return total + item.quantity * (product?.price || 0);
  }, 0);

  const shipping = total < 1000 ? 4.99 : 0;

  return (
    <div className="bordered order-summary">
      <div className="summary-header card-padding">
        <span className="align-left">Заказ</span>
        <span className="align-right">{validCartItems.length} шт.</span>
      </div>
      <div className="divider" />

      {validCartItems.length === 0 && (
        <div className="card-padding">Корзина пуста</div>
      )}

      {validCartItems.map((cartItem) => {
        const data = getProductById(cartItem.id);
        return (
          <SummaryItemCard
            key={cartItem.id}
            item={data!}
            quantity={cartItem.quantity}
          />
        );
      })}

      <div className="divider" />
      <div className="pricing card-padding">
        <p className="pricing-line">
          <span>Стоимость:</span>
          <span>${total.toFixed(2)}</span>
        </p>
        <p className="pricing-line">
          <span>Доставка:</span>
          <span>{total < 1000 ? "$4.99" : "бесплатно"}</span>
        </p>
        <div className="divider" />
        <div className="pricing-line">
          <h4>Всего:</h4>
          <h4>${(total + shipping).toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
}
