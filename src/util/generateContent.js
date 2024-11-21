export const generateContent = (
  content,
  excludeKeys = [],
  relationshipsKey = "relationships"
) => {
  const contentKeys = Object.keys(content).filter(
    (key) => !excludeKeys.includes(key) && key !== relationshipsKey
  );

  const relationships =
    content[relationshipsKey] && JSON.parse(content[relationshipsKey]);

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
      ) : (
        <p className="character-content-text">{content[key]}</p>
      )}
    </div>
  ));
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
  return text
    .split(/\n\n|\\n\\n/) // Split by actual or escaped double newlines
    .filter((paragraph) => paragraph.trim() !== "") // Remove empty lines
    .map((paragraph, index) => (
      <p key={index} className="character-content-text">
        {paragraph.trim()}
      </p>
    ));
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
          <li key={subIndex} className="character-sub-content-header">
            <strong>{subKey.charAt(0).toUpperCase() + subKey.slice(1)}</strong>
            <p className="character-sub-text">{relationships[subKey]}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
