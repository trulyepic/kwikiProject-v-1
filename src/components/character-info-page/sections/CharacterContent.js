import React from "react";
import CharacterTableOfContents from "./CharacterTableOfContents";

const CharacterContent = ({ characterData, characterContent }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to render formatted paragraphs for the description
  const renderDescription = (description) => {
    if (!description) return null; // Handle empty or undefined descriptions
    return description
      .split(/\n\n|\\n\\n/) // Split by double newlines or escaped double newlines
      .filter((paragraph) => paragraph.trim() !== "") // Remove empty lines
      .map((paragraph, index) => (
        <p key={index} className="character-description-paragraph">
          {paragraph.trim()}
        </p>
      ));
  };

  return (
    <div className="character_summary_text">
      <div className="character-description">
        <span>{renderDescription(characterData.description)}</span>
      </div>
      <CharacterTableOfContents
        scrollToSection={scrollToSection}
        characterContent={characterContent}
      />
    </div>
  );
};

export default CharacterContent;
