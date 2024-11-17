import React, { useEffect } from "react";
import { getCharacterDetailByCharacterId } from "../../../api/api";
import {
  generateContent,
  renderContent,
  renderRelationships,
} from "../../../util/generateContent";

const CharacterAdditionalContent = ({ characterContent }) => {
  // Extract relationships and parse JSON if necessary
  // const relationships =
  //   characterContent.relationships &&
  //   JSON.parse(characterContent.relationships);

  // Filter out "contentId" and "characterId" and dynamically generate content
  // const contentKeys = Object.keys(characterContent).filter(
  //   (key) =>
  //     key !== "contentId" && key !== "characterId" && key !== "relationships"
  // );

  const { contentKeys, relationships } = generateContent(characterContent, [
    "contentId",
    "characterId",
  ]);

  return (
    <div className="character_additional_content">
      {renderContent(characterContent, contentKeys)}
      {renderRelationships(relationships)}
      {/* <h2 className="character-content-header" id="biography">
        Biography
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="character-content-header">Abilities and Limitations</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="character-content-header">Personality</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="character-content-header">Relationships</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <ul>
        <li className="character-sub-content-header">relationship 1</li>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <li className="character-sub-content-header">relationship 2</li>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </ul> */}
    </div>
  );
};

export default CharacterAdditionalContent;
