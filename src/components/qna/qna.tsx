import "./qna.css";

import { forwardRef } from "react";

const QnA = forwardRef<HTMLDivElement, {}>(function QnA(props, ref) {
  return (
    <div className="qna layout" ref={ref}>
      <h1>ЧаВо</h1>
      <div>
        <h3>Что это?</h3>
        <p>
          Это магазин, где вы можете купить ультра-пушистых червей. Они
          невероятно мягкие и приятные на ощупь!
        </p>
        <br />
        <h3>Как это работает?</h3>
        <p>
          Вы выбираете понравившегося червя, добавляете его в корзину и
          оформляете заказ. Мы доставим вашего нового друга прямо к вам домой!
        </p>
        <br />
        <h3>Почему стоит купить червя?</h3>
        <p>Думать об этом может каждый, а ты купи червя!</p>
      </div>
    </div>
  );
});

export default QnA;
