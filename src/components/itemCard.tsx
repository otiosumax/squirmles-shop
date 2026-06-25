import "../styles/itemCard.css";
import type { CardData } from "../model/cardData";

export default function ItemCard({ item }: { item: CardData }) {
  const imageUrl: string = item?.imageUrl || "images/placeholder.jpg";

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
        <div>
          <h2 className="item-price" style={{ color: item.color }}>
            ${item.price * 1000}
          </h2>
          <button className="add-to-cart">В корзину</button>
        </div>
      </div>
    </div>
  );
}
