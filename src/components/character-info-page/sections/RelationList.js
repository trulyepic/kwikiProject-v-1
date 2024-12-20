import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCharacterDetailByName } from "../../../api/api";

const RelationList = ({ data }) => {
  //   const [charName, setCharName] = useState("");
  //   const [characterData, setCharacterData] = useState({});
  const navigate = useNavigate();

  //to do --> need to make characters that appear in character detail clickable
  //clicking on the character name should take them to the character page
  const handleCharacterClick = async (characterName) => {
    // setCharName(characterName);
    try {
      const characterData = await getCharacterDetailByName(characterName);
      console.log("characterData in RelationList: ", characterData);
      navigate(`/character/${characterData.name}`, {
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
          // className="clickable-name"
          // onClick={() => handleCharacterClick(name)}
          >
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default RelationList;
