import React, { useEffect } from "react";
import { getCharacterDetailByCharacterId } from "../../../api/api";
import {
  generateContent,
  renderContent,
  renderRelationships,
} from "../../../util/generateContent";

const CharacterAdditionalContent = ({ characterContent, characterRef }) => {
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

  const renderReferences = (content, className) => {
    return (
      <ul className={`${className} reference_list`}>
        {content.split(/,|\\n/).map((ref, index) => {
          const trimmedRef = ref.trim();
          // Check if the reference is a URL
          const isLink = /^https?:\/\//.test(trimmedRef);
          return (
            <li key={index} className={className}>
              <span className="link-numb">[{index + 1}]</span>
              {isLink ? (
                <a href={trimmedRef} target="_blank" rel="noopener noreferrer">
                  {trimmedRef}
                </a>
              ) : (
                trimmedRef
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="character_additional_content">
      {renderContent(characterContent, contentKeys, characterRef)}
      {renderRelationships(relationships)}

      {/* Always render references as the last item */}
      {characterRef && (
        <div id="referencesRef">
          <h2 className="character-content-header">References</h2>
          {renderReferences(characterRef, "content-text")}
        </div>
      )}
    </div>
  );
};

export default CharacterAdditionalContent;
