import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "../ratings/Rating";

const SeriesCard = ({ title, genre, imageUrl, id, seriesData }) => {
  const navigate = useNavigate();

  const BASE_URL = "http://localhost:8080";

  const handleCardClick = () => {
    navigate(`/series/${title}`, {
      state: { img: `${imageUrl}`, seriesId: id, seriesData },
    });
  };

  return (
    <div className="series-card" onClick={handleCardClick}>
      <img src={`${imageUrl}`} alt={title} />
      <div className="series-info">
        <h3>{title}</h3>
        <p>{genre}</p>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <Rating seriesId={id} />
      </div>
    </div>
  );
};

export default SeriesCard;
