import { useEffect, useState } from "react";
import ItemCard from "../itemCard/itemCard";
import type { CardData } from "../../models/cardData";

import './collection.css'

export default function Collection() {
  const [items, setItems] = useState<CardData[]>([]);

  useEffect(() => {
    fetch("/sample.json")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Ошибка:", error));
  }, []);

  return (
    <div className="collection">
      <h1>Коллекция</h1>
      <p>Свой червь под каждый вайб!</p>
      <br />
      <div className="selling-items">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
      </div>
    </div>
  );
}
