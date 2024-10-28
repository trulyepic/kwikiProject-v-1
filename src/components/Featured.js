import React from "react";
import "./Featured.css";
import featuredImage from "./images/featured.jpg";

const Featured = () => {
  return (
    <section
      className="app_featured"
      style={{ backgroundImage: `url(${featuredImage})` }}
    >
      {/*dark overlay */}
      {/* <div className="overlay"></div> */}
      <div className="featured_content">
        <h2>Doctor Odyssey</h2>
        <p>Max is the new on-board doctor for a luxury cruise ship...</p>
        <div className="featured_buttons">
          <button>Details</button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
