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
    </div>
  );
};

export default CharacterAdditionalContent;
