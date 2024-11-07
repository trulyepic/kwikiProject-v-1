import React from "react";

const CharacterDetailPanel = ({ characterImage, characterName }) => {
  return (
    <div className="character_info">
      <h2 className="character_detail_name">{characterName}</h2>
      <img
        src={characterImage}
        alt={characterName}
        className="character_image"
      />
      <div className="character_details">
        <div className="character_box">
          <div className="character_item">
            <span className="character_label">Actor</span>
            <span className="character_value">Jakie</span>
          </div>
          <div className="character_item">
            <span className="character_label">Gender</span>
            <span className="character_value">Male</span>
          </div>
          <div className="character_item">
            <span className="character_label">Age</span>
            <span className="character_value">30</span>
          </div>
          <div className="character_item">
            <span className="character_label">Occupation</span>
            <span className="character_value">
              <ul>
                <li>Dancer</li>
                <li>Fighter</li>
              </ul>
            </span>
          </div>
          <div className="character_item">
            <span className="character_label">Family</span>
            <span className="character_value">
              <ul className="detail_item-ul">
                <li>Mother - Ruth</li>
                <li>Father - Luke</li>
                <li>Sister - Sis</li>
                <li>Brother - bro</li>
              </ul>
            </span>
          </div>

          <div className="character_item">
            <span className="character_label">Enemies</span>
            <span className="character_value">
              <ul className="detail_item-ul">
                <li>Jake</li>
                <li>Faith</li>
                <li>Made</li>
                <li>Yoo</li>
              </ul>
            </span>
          </div>
          <div className="character_item">
            <span className="character_label">Status</span>
            <span className="character_value">Alive</span>
          </div>
          <div className="detail_item">
            <span className="character_label">Episode Count</span>
            <span className="character_value">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPanel;
