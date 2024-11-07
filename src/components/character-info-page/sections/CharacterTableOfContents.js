import React from "react";

const CharacterTableOfContents = ({ scrollToSection }) => {
  return (
    <div className="character_table_of_contents">
      <h3>Contents</h3>
      <ul>
        <li onClick={() => scrollToSection("biography")}>
          1. Biography
          {/* <ul>
              <li>1.1. Life</li>
              <li>1.5. Search for God</li>
              <li>1.6. Following the jazz</li>
              <li>1.7. The Messiah</li>
              <li>1.8. Return to Angelville</li>
            </ul> */}
        </li>
        <li onClick={() => scrollToSection("powers and abilities")}>
          2. Abilities and Limitations
          {/* <ul>
              <li onClick={() => scrollToSection("powers")}>2.1. Powers</li>
              <li onClick={() => scrollToSection("limitations")}>
                2.2. Limitations
              </li>
              <li onClick={() => scrollToSection("abilities")}>2.3. Abilities</li>
            </ul> */}
        </li>
        <li onClick={() => scrollToSection("personality")}>3. Personality</li>
        <li onClick={() => scrollToSection("relationships")}>
          4. Relationships
        </li>
      </ul>
    </div>
  );
};

export default CharacterTableOfContents;
