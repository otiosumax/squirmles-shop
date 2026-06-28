import { forwardRef } from "react";
import ItemCard from "../itemCard/itemCard";

import "./collection.css";
import { useProducts } from "../../contents/productsContext";

const Collection = forwardRef<HTMLDivElement>(function Hero(props, ref) {
  const products = useProducts();

  return (
    <div ref={ref} className="collection">
      <h1>Коллекция</h1>
      <p>Свой червь под каждый вайб!</p>
      <br />
      <div className="selling-items">
        {products.productsList.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
});

export default Collection;
