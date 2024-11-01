import React from "react";
import "./GridItem.css";

const GridItem = ({ title, img }) => {
  return (
    <div className="grid_item">
      <div className="grid_item_content">
        <img src={img} alt={title} />
        <p>{title}</p>
      </div>
    </div>
  );
};

export default GridItem;
