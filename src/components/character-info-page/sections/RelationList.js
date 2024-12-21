import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCharacterDetailByName } from "../../../api/api";

const RelationList = ({ data }) => {
  const navigate = useNavigate();

  const handleCharacterClick = async (characterName) => {
    // setCharName(characterName);
    try {
      const character = await getCharacterDetailByName(characterName);
      console.log("characterData in RelationList: ", character);

      const {
        id,
        name,
        imageUrl,
        gender,
        age,
        species,
        status,
        family,
        enemies,
        friends,
        description,
        playedBy,
        occupation,
        affiliation,
        role,
      } = character;

      const characterData = {
        id,
        name,
        img: imageUrl === null ? "https://via.placeholder.com/100" : imageUrl,
        gender,
        age,
        species,
        status,
        family,
        enemies,
        friends,
        description,
        playedBy: playedBy?.realName,
        occupation,
        affiliation,
        role,
      };

      navigate(`/character/${name}`, {
        state: {
          characterData,
        },
      });
    } catch (error) {
      console.error(
        `Error fetching details for character "${characterName}": `,
        error
      );
    }
  };

  if (!data) return "None";

  return (
    <ul className="detail_item-ul">
      {Object.entries(data).map(([relation, name], index) => (
        <li key={index}>
          {relation} -{" "}
          <span
            className="clickable-name"
            onClick={() => handleCharacterClick(name)}
          >
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default RelationList;
