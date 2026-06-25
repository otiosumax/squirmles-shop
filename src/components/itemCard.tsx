import "../styles/itemCard.css";
import type { CardData } from "../model/cardData";

export default function ItemCard({ item }: { item: CardData }) {
  return (
    <div className="item-card">
      <div className="item-image"> image</div>
      <div className="item-info">
        <h2 className="item-name">{item.name}</h2>
        <p className="item-description">{item.tagline}</p>
        <p className="item-price">${item.price*1000}</p>
      </div>
    </div>
  );
}
