import React from "react";

export const generateContent = (
  content,
  excludeKeys = [],
  relationshipsKey = "relationships"
) => {
  const contentKeys = Object.keys(content).filter(
    (key) => !excludeKeys.includes(key) && key !== relationshipsKey
  );

  let relationships = null;
  try {
    if (content[relationshipsKey]) {
      relationships = JSON.parse(content[relationshipsKey]);
    }
  } catch (error) {
    console.error("Failed to parse relationships JSON:", error);
  }

  console.log("Parsed Relationships:", relationships);

  return { contentKeys, relationships };
};

// export const renderContent = (content, contentKeys) => {
//   return contentKeys.map((key, index) => (
//     <div key={index}>
//       <h2 className="character-content-header" id={key}>
//         {key.charAt(0).toUpperCase() + key.slice(1)}
//       </h2>
//       {key === "biography" ? (
//         renderParagraphs(content[key]) // Handle splitting content into paragraphs for biography
//       ) : (
//         <p className="character-content-text">{content[key]}</p>
//       )}
//     </div>
//   ));
// };

export const renderContent = (content, contentKeys) => {
  return contentKeys.map((key, index) => (
    <div key={index}>
      <h2 className="character-content-header" id={key}>
        {key.charAt(0).toUpperCase() + key.slice(1)}
      </h2>
      {key === "biography" ? (
        renderParagraphs(content[key]) // Existing function for biography
      ) : key === "personality" ? (
        renderPersonalityParagraphs(content[key]) // New function for personality
      ) : key === "abilities" ? (
        renderAbilitiesAndLimitations(content[key])
      ) : key === "limitations" ? (
        renderAbilitiesAndLimitations(content[key])
      ) : (
        <p className="character-content-text">{content[key]}</p>
      )}
    </div>
  ));
};

export const renderAbilitiesAndLimitations = (abilities) => {
  if (!abilities) return null;

  const parsedAbilites = JSON.parse(abilities);

  return (
    <div>
      <ul>
        {Object.keys(parsedAbilites).map((abilityKey, index) => (
          <li key={index} className="character-content-text">
            <strong>{abilityKey}:</strong> {parsedAbilites[abilityKey]}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Existing function for biography
const renderParagraphs = (text) => {
  return text
    .split(/\\n\\n/) // Handle escaped newline characters
    .map((paragraph, index) => (
      <p key={index} className="character-content-text">
        {paragraph.trim()}
      </p>
    ));
};

// New function for personality
const renderPersonalityParagraphs = (text) => {
  if (text == null) return;
  return text
    .split(/\n\n|\\n\\n/) // Split by actual or escaped double newlines
    .filter((paragraph) => paragraph.trim() !== "") // Remove empty lines
    .map((paragraph, index) => (
      <p key={index} className="character-content-text">
        {paragraph.trim()}
      </p>
    ));
};

const formatText = (text) => {
  // console.log("text: ", text);
  if (!text || typeof text !== "string") return []; // Safeguard against invalid input

  // Split into paragraphs at periods if word count exceeds 200
  const words = text.split(" ");
  if (words.length <= 80) {
    return [text.trim()]; // Treat as a single paragraph
  }

  let wordCount = 0;
  let currentParagraph = "";
  const paragraphs = [];

  words.forEach((word) => {
    currentParagraph += word + " ";
    wordCount++;

    // Check if the word ends with a period and word count exceeds 200
    if (wordCount > 80 && word.endsWith(".")) {
      paragraphs.push(currentParagraph.trim());
      currentParagraph = "";
      wordCount = 0; // Reset the word count
    }
  });

  // Add any remaining text as the last paragraph
  if (currentParagraph.trim()) {
    paragraphs.push(currentParagraph.trim());
  }
  console.log("Formatted Paragraphs:", paragraphs);
  return paragraphs;
};

export const renderRelationships = (relationships) => {
  if (!relationships) return null;

  return (
    <div>
      <h2 className="character-content-header" id="relationships">
        Relationships
      </h2>
      <ul>
        {Object.keys(relationships).map((subKey, subIndex) => (
          <React.Fragment key={subKey}>
            <li key={subIndex} className="character-sub-content-header">
              <strong>
                {subKey.charAt(0).toUpperCase() + subKey.slice(1)}
              </strong>
              {formatText(relationships[subKey]).map(
                (paragraph, paragraphIndex) => (
                  <p key={paragraphIndex} className="character-sub-text">
                    {paragraph}
                  </p>
                )
              )}
            </li>
            <br />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
