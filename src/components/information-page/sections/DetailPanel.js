import React from "react";

const DetailPanel = ({ title }) => {
  return (
    <div className="details_panel">
      <img
        src="https://via.placeholder.com/200"
        alt={title}
        className="title_image"
      />
      <div className="details_box">
        <div className="detail_item">
          <span className="label">Type</span>
          <span className="value">Series</span>
        </div>
        <div className="detail_item">
          <span className="label">Distributor</span>
          <span className="value">AMC</span>
        </div>
        <div className="detail_item">
          <span className="label">Channels</span>
          <span className="value">AMC, Fox, Disney+</span>
        </div>
        <div className="detail_item">
          <span className="label">Seasons</span>
          <span className="value">3</span>
        </div>
        <div className="detail_item">
          <span className="label">Episodes</span>
          <span className="value">42</span>
        </div>
        <div className="detail_item">
          <span className="label">Original Run</span>
          <span className="value">Oct 31, 2010 - Nov 20, 2022</span>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;
