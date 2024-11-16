import React from "react";
import SeriesCard from "./SeriesCard";

const SeriesGrid = ({ items }) => {
  return (
    <div className="series-grid">
      {items.map((item) => (
        <SeriesCard
          key={item.id}
          title={item.title}
          genre={item.genre}
          imageUrl={item.imageUrl}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default SeriesGrid;
