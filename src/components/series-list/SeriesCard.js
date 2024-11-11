import React from "react";
import { useNavigate } from "react-router-dom";

const SeriesCard = ({ title, genre }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/series/${title}`);
  };
  return (
    <div className="series-card" onClick={handleCardClick}>
      <img src="https://via.placeholder.com/150" alt={title} />
      <div className="series-info">
        <h3>{title}</h3>
        <p>{genre}</p>
      </div>
    </div>
  );
};

export default SeriesCard;
