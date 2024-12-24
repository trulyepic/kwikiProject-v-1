import React from "react";
import CharacterTableOfContents from "./CharacterTableOfContents";

const CharacterContent = ({ characterData, characterContent }) => {
  // console.log("characterData in CharacterContent: ", characterData);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to render formatted paragraphs for the description
  const renderDescription = (description) => {
    if (!description) return null; // Handle empty or undefined descriptions
    return (
      description
        // .replace(/\\n/g, "\n") // Replace escaped \n with actual newlines
        // .split(/\n{2,}/) // Split by one or more newlines
        .split(/\n\n|\\n\\n/) // Split by double newlines or escaped double newlines
        .filter((paragraph) => paragraph.trim() !== "") // Remove empty lines
        .map((paragraph, index) => (
          <p key={index} className="character-description-paragraph">
            {paragraph.trim()}
          </p>
        ))
    );
  };
  // const renderDescription = (description) => {
  //   if (!description) return null; // Handle empty or undefined descriptions

  //   return description
  //     .split(/\n{2,}|\\n{2,}/) // Split into paragraphs on two or more newlines
  //     .filter((paragraph) => paragraph.trim() !== "") // Remove empty paragraphs
  //     .map((paragraph, index) => (
  //       <p key={index} className="character-description-paragraph">
  //         {paragraph.trim()}
  //       </p>
  //     ));
  // };

  return (
    <div className="character_summary_text">
      <div className="character-description">
        <span>{renderDescription(characterData.description)}</span>
      </div>
      <CharacterTableOfContents
        scrollToSection={scrollToSection}
        characterContent={characterContent}
        characterRef={characterData.referencesData}
      />
    </div>
  );
};

export default CharacterContent;
