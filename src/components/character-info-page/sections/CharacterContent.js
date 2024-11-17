import React from "react";
import CharacterTableOfContents from "./CharacterTableOfContents";

const CharacterContent = ({ characterData, characterContent }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="character_summary_text">
      <p>{characterData.description}</p>

      <CharacterTableOfContents
        scrollToSection={scrollToSection}
        characterContent={characterContent}
      />
    </div>
  );
};

export default CharacterContent;
