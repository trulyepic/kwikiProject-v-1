import React from "react";
import { useNavigate } from "react-router-dom";
import "./GridItem.css";

const GridItem = ({ id, title, img, seriesData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Find the specific series data for the clicked series
    const selectedSeriesData = seriesData.find((series) => series.id === id);
    navigate(`/series/${title}`, {
      state: { img, seriesId: id, seriesData: selectedSeriesData },
    });
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
