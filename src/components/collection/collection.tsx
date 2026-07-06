import "./collection.css";

import ItemCard from "../itemCard/itemCard";
import { forwardRef } from "react";
import { useProducts } from "../../contexts/productsContext";

const Collection = forwardRef<HTMLDivElement>(function Hero(props, ref) {
  const products = useProducts();
  console.log(props);

  return (
    <div ref={ref} className="collection layout">
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
