import React from "react";

const Card = ({ product }) => {
  const { title, description, image } = product;
  return (
    <div className="tc bg-light-green br3 pa3 ma2 dib bw2 shadow-5 w-[200px] h-[200px]">
      <img className="h-30 w-30" alt="prooducts" src={image} />
      <div>
        <h2 className="truncate">{title}</h2>
        <p className="truncate">{description}</p>
      </div>
    </div>
  );
};

export default Card;
