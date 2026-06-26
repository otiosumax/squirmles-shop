import "./itemCard.css";
import type { CardData } from "../../models/cardData";
import { useCart } from "../../contents/cartContext";

export default function ItemCard({ item }: { item: CardData }) {
  const imageUrl: string = item?.imageUrl || "images/placeholder.jpg";
  const itemId: string = item?.id || "unknown";

  const cart = useCart();

  const inCartItemQuantity =
    cart.inCart.find((cartItem) => cartItem.id === itemId)?.quantity || 0;

  if (
    !(item && item.name && imageUrl && item.price && item.stars && item.reviews)
  ) {
    return (
      <div className="item-card">
        <div
          className="item-image"
          style={{ backgroundColor: item?.bg || "#ccc" }}
        >
          <div
            className="item-badge"
            style={{ backgroundColor: item?.badgeColor || "#999" }}
          >
            {item?.badge || "No Badge"}
          </div>
          <div className="item-image-content">
            <img src={imageUrl} alt={item?.name || "Placeholder"} />
          </div>
        </div>
        <div className="item-info">
          <h2 className="item-name">{item?.name || "Unknown Item"}</h2>
          <p className="item-description">
            {item?.tagline || "No description available."}
          </p>
          <p className="item-price">${(item?.price || 0) * 1000}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="item-card">
      <div className="item-image" style={{ backgroundColor: item.bg }}>
        <div
          className="item-badge"
          style={{ backgroundColor: item.badgeColor }}
        >
          {item.badge}
        </div>
        <div className="item-image-content">
          <img src={imageUrl} alt={item.name} />
        </div>
      </div>
      <div className="item-info">
        <h2 className="item-name">{item.name}</h2>
        <p className="item-description">{item.tagline}</p>
        <span className="item-stars">
          {Array.from({ length: Math.round(item.stars) }, (_, index) => (
            <span key={index} className="star">
              ★
            </span>
          ))}
          <span className="item-reviews">({item.reviews})</span>
        </span>
        <br />
        <div className="item-price-container">
          <h2 className="item-price" style={{ color: item.color }}>
            ${item.price * 1000}
          </h2>
          {inCartItemQuantity === 0 && (
            <button
              className="add-to-cart"
              style={{ borderColor: item.color }}
              onClick={() => {
                cart.addToCart({ id: itemId, quantity: 1 });
              }}
            >
              В корзину
            </button>
          )}
          {inCartItemQuantity != 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
}
