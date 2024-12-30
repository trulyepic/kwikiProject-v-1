import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../ratings/Rating";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SeriesCard = ({ title, genre, imageUrl, id, seriesData }) => {
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8080";

  const handleCardClick = () => {
    // Save series data to localStorage
    localStorage.setItem(
      "selectedSeries",
      JSON.stringify({ img: imageUrl, seriesId: id, ...seriesData })
    );

    navigate(`/series/${title}`, {
      state: { img: `${imageUrl}`, seriesId: id, seriesData },
    });
  };

  return (
    <div className="series-card" onClick={handleCardClick}>
      {/* Lazy-loaded image for performance optimization */}
      <LazyLoadImage
        src={imageUrl}
        alt={`${title} - A ${genre} series`}
        effect="blur"
        className="series-card-image"
      />
      {/* <img src={`${imageUrl}`} alt={title} /> */}
      <div className="series-info">
        <h3>{title}</h3>
        <p>{genre}</p>
      </div>
      {/* Prevent rating click from triggering card navigation */}
      <div onClick={(e) => e.stopPropagation()} className="rating-series-list">
        <Rating seriesId={id} />
      </div>
    </div>
  );
};

export default SeriesCard;
