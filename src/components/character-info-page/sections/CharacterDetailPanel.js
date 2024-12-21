import React from "react";
import { convertToArray } from "../../../util/convertoArray";
import RelationList from "./RelationList";

const CharacterDetailPanel = ({ characterData }) => {
  console.log("character data: ", characterData);
  if (!characterData) return null;
  const {
    name,
    img,
    gender,
    age,
    species,
    status,
    family,
    friends,
    enemies,
    playedBy,
    description,
    occupation,
    affiliation,
  } = characterData;
  const BASE_URL = "http://localhost:8080";
  const parsedFamily = family ? JSON.parse(family) : null;
  const parsedFriends = friends ? JSON.parse(friends) : null;
  const parsedEnemies = enemies ? JSON.parse(enemies) : null;

  const occupationArray = convertToArray(occupation);

  return (
    <div className="character_info">
      <h2 className="character_detail_name">{name}</h2>
      <img src={`${img}`} alt={name} className="character_image" />
      <div className="character_details">
        <div className="character_box">
          <div className="character_item">
            <span className="character_label">Gender</span>
            <span className="character_value">{gender}</span>
          </div>
          <div className="character_item">
            <span className="character_label">Species</span>
            <span className="character_value">{species}</span>
          </div>
          <div className="character_item">
            <span className="character_label">Age</span>
            <span className="character_value">{age}</span>
          </div>
          <div className="character_item">
            <span className="character_label">Occupation</span>
            <span className="character_value">
              <ul className="detail_item-ul">
                {occupationArray.map((occu, index) => (
                  <li key={index}>{occu}</li>
                ))}
                {/* <li>Dancer</li>
                <li>Fighter</li> */}
              </ul>
            </span>
          </div>
          <div className="character_item">
            <span className="character_label">Affiliation</span>
            <span className="character_value">{affiliation}</span>
          </div>
          <div className="character_item">
            <span className="character_label">Family</span>
            <span className="character_value">
              {/* {family} */}
              {/* <ul className="detail_item-ul">
                <li>Mother - Ruth</li>
                <li>Father - Luke</li>
                <li>Sister - Sis</li>
                <li>Brother - bro</li>
              </ul> */}
              <ul className="detail_item-ul">
                {parsedFamily ? <RelationList data={parsedFamily} /> : "None"}
              </ul>
            </span>
          </div>

          <div className="character_item">
            <span className="character_label">Friends</span>
            <span className="character_value">
              <ul className="detail_item-ul">
                {parsedFriends ? <RelationList data={parsedFriends} /> : "None"}
              </ul>
            </span>
          </div>

          <div className="character_item">
            <span className="character_label">Enemies</span>
            <span className="character_value">
              <ul className="detail_item-ul">
                {parsedEnemies ? <RelationList data={parsedEnemies} /> : "None"}
              </ul>
            </span>
          </div>
          <div className="character_item">
            <span className="character_label">Status</span>
            <span className="character_value">{status}</span>
          </div>
          <div className="detail_item">
            <span className="character_label">Played by</span>
            <span className="character_value">{playedBy}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPanel;
