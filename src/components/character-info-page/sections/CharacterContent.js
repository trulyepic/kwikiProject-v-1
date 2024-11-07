import React from "react";
import CharacterTableOfContents from "./CharacterTableOfContents";

const CharacterContent = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="character_summary_text">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac
        magna at orci varius venenatis. Nulla quis risus vitae felis scelerisque
        efficitur. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Praesent ac magna at orci varius venenatis.
      </p>
      <p>
        Further details about the character, including background, achievements,
        and storyline information that flows around the character details and
        image.
      </p>

      <CharacterTableOfContents scrollToSection={scrollToSection} />
    </div>
  );
};

export default CharacterContent;
