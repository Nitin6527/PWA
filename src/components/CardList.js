import React from "react";
import Card from "./Card";

const CardList = ({ products }) => {
  return (
    <div className="flex justify-center items-center max-w-[80%] overflow-auto">
      {products.map((product) => {
        return <Card key={product.id} product={product} />;
      })}
    </div>
  );
};

export default CardList;
