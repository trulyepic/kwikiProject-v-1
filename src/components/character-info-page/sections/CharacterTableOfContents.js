import React, { useState } from "react";
import { generateContent } from "../../../util/generateContent";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const CharacterTableOfContents = ({ scrollToSection, characterContent }) => {
  console.log("characterContent: ", characterContent);
  const [isExposed, setIsExposed] = useState(true);

  //extract relationships and parse JSON if necessary
  // const relationships =
  //   characterContent.relationships &&
  //   JSON.parse(characterContent.relationships);

  // Filter out "contentId" and "characterId" and dynamically create content
  // const contentKeys = Object.keys(characterContent).filter(
  //   (key) =>
  //     key !== "contentId" && key !== "characterId" && key !== "relationships"
  // );

  const { contentKeys, relationships } = generateContent(characterContent, [
    "contentId",
    "characterId",
  ]);

  return (
    <div className="character_table_of_contents">
      <div className="character_toc_header">
        <h3>Contents</h3>
        <span
          className="character_toc_hide"
          onClick={() => setIsExposed(!isExposed)}
        >
          hide {isExposed ? <DownOutlined /> : <UpOutlined />}
        </span>
      </div>
      {isExposed && (
        <ul>
          {contentKeys.map((key, index) => (
            <li key={index} onClick={() => scrollToSection(key)}>
              {index + 1}. {key.charAt(0).toUpperCase() + key.slice(1)}
            </li>
          ))}
          <li onClick={() => scrollToSection("relationships")}>
            {contentKeys.length + 1}. Relationsips
            {relationships && (
              <ul>
                {Object.keys(relationships).map((subKey, subIndex) => (
                  <li key={subIndex} onClick={() => scrollToSection(subKey)}>
                    {subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      )}
      {/* <ul>
        <li onClick={() => scrollToSection("biography")}>
          1. Biography
         
        </li>
        <li onClick={() => scrollToSection("powers and abilities")}>
          2. Abilities and Limitations
        
        </li>
        <li onClick={() => scrollToSection("personality")}>3. Personality</li>
        <li onClick={() => scrollToSection("relationships")}>
          4. Relationships
        </li>
      </ul> */}
    </div>
  );
};

export default CharacterTableOfContents;
