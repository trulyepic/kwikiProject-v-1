import React from "react";
import { useNavigate } from "react-router-dom";
import "./GridItem.css";

const GridItem = ({ title, img }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/series/${title}`);
  };
  return (
    <div className="grid_item" onClick={handleClick}>
      <div className="grid_item_content">
        <img src={img} alt={title} />
        <p>{title}</p>
      </div>
    </div>
  );
};

export default GridItem;
