import React from "react";
import "./GridItem.css";

const GridItem = ({ title, img }) => {
  return (
    <div className="grid_item">
      <img src={img} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default GridItem;
