import React from "react";
import "./Featured.css";
import featuredImage from "./images/featured2.png";

const Featured = () => {
  return (
    <section
      className="app_featured"
      style={{ backgroundImage: `url(${featuredImage})` }}
    >
      <div className="featured_content">
        <h2>K-Wiki</h2>
        <p>Explore information on all your favorite Korean shows</p>
      </div>
    </section>
  );
};

export default Featured;
