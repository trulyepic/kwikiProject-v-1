import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCharacterDetailByName } from "../../../api/api";
import { use } from "react";

const RelationList = ({ data }) => {
  const [clickableNames, setClickableNames] = useState({});
  const navigate = useNavigate();

  //useEffect to check if the names are available in the database
  //if they are, set them to clickable
  useEffect(() => {
    const checkNames = async () => {
      const updatedClickableNames = {};

      for (const [relation, value] of Object.entries(data)) {
        const names = Array.isArray(value) ? value : [value];
        for (const name of names) {
          try {
            const response = await getCharacterDetailByName(name);
            updatedClickableNames[name] = response.status !== 404;
          } catch (error) {
            if (error.response && error.response.status === 404) {
              updatedClickableNames[name] = false;
            } else {
              console.error(`Error checking character "${name}": `, error);
            }
          }
        }
      }

      // for (const name of Object.values(data)) {
      //   try {
      //     const response = await getCharacterDetailByName(name);
      //     updatedClickableNames[name] = response.status !== 404;
      //   } catch (error) {
      //     if (error.response && error.response.status === 404) {
      //       updatedClickableNames[name] = false;
      //     } else {
      //       console.error(`Error checking character "${name}": `, error);
      //     }
      //   }
      // }
      setClickableNames(updatedClickableNames);
    };
    if (data) {
      checkNames();
    }
  }, [data]);

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
      {Object.entries(data).map(([relation, value], index) => {
        const names = Array.isArray(value) ? value : [value];
        return (
          <li key={index}>
            <span className="relation-title">{relation} </span>
            {names.map((name, idx) => (
              <div key={idx}>
                <span
                  // className="clickable-name"
                  className={
                    clickableNames[name] === false ? "" : "clickable-name"
                  }
                  onClick={() => handleCharacterClick(name)}
                >
                  {name}
                </span>
              </div>
            ))}
            {/* <span
            // className="clickable-name"
            className={clickableNames[name] === false ? "" : "clickable-name"}
            onClick={() => handleCharacterClick(name)}
          >
            {name}
          </span> */}
          </li>
        );
      })}
    </ul>
  );
};

export default RelationList;
