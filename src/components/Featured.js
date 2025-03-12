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
        {/* <h2>Star K-wiki Hub</h2> */}
        <h2>Starflicks Wiki</h2>
        <p>
          Explore information on all your favorite Korean shows and Star them
          up!
        </p>
      </div>
    </section>
  );
};

export default Featured;
