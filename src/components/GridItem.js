import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GridItem.css";
import Rating from "./ratings/Rating";
import { Spin } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

const GridItem = ({ id, title, img, seriesData }) => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const handleClick = () => {
    // Find the specific series data for the clicked series
    const selectedSeriesData = seriesData.find((series) => series.id === id);

    //save the selected series data to local storage
    localStorage.setItem(
      "selectedSeries",
      JSON.stringify({ ...selectedSeriesData, img })
    );

    navigate(`/series/${title}`, {
      state: { img, seriesId: id, seriesData: selectedSeriesData },
    });
  };
  return (
    <div className="grid_item" onClick={handleClick}>
      <div className="grid_item_content">
        {/* <img src={img} alt={title} /> */}
        {/* LazyLoadImage replaces the traditional img tag */}
        <LazyLoadImage
          src={img}
          alt={`${title} series poster`}
          effect="blur"
          className="grid_item_image"
        />
        <p>{title}</p>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Rating seriesId={id} />
      </div>
    </div>
  );
};

export default GridItem;
