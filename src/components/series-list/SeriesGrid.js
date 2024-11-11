import React from "react";
import SeriesCard from "./SeriesCard";

const SeriesGrid = ({ items }) => {
  return (
    <div className="series-grid">
      {items.map((item) => (
        <SeriesCard key={item.id} title={item.title} genre={item.genre} />
      ))}
    </div>
  );
};

export default SeriesGrid;
