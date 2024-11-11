import React from "react";
import { useNavigate } from "react-router-dom";

const GridItemFiltered = ({ title, img }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/series/${title}`);
  };
  return (
    <div className="" onClick={handleClick}>
      <div className="">
        <img src={img} alt={title} />
        <p>{title}</p>
      </div>
    </div>
  );
};

export default GridItemFiltered;
