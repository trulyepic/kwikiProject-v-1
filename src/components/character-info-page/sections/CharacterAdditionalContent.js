import React from "react";

const CharacterAdditionalContent = () => {
  return (
    <div className="character_additional_content">
      <h2 className="character-content-header" id="biography">
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
      </ul>
    </div>
  );
};

export default CharacterAdditionalContent;
