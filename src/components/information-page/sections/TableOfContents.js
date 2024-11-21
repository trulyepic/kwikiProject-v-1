import React from "react";

const TableOfContents = ({ scrollToSection, seriesContent }) => {
  console.log("series content table of content: ", seriesContent);

  const sectionOrder = [
    { key: "synopsis", label: "I. Synopsis" },
    { key: "development", label: "II. Development" },
    { key: "awardsAndNominations", label: "III. Awards and Nominations" },
    { key: "receptionAndImpact", label: "IV. Reception and Impact" },
    { key: "references", label: "V. References" },
  ];

  // Filter sections to include only those present in the seriesContent
  const availableSections = sectionOrder.filter(
    (section) => seriesContent[section.key]
  );

  return (
    <div className="table_of_contents">
      <h3>Contents</h3>
      <ul>
        {availableSections.map((section) => (
          <li key={section.key} onClick={() => scrollToSection(section.key)}>
            {section.label}
          </li>
        ))}
        {/* <li onClick={() => scrollToSection("synopsis")}>Synopsis</li>
        <li onClick={() => scrollToSection("development")}> Development</li>
        <li onClick={() => scrollToSection("awards and nominations")}>
          Awards and Nominations
        </li>
        <li onClick={() => scrollToSection("references")}>References</li> */}
      </ul>
    </div>
  );
};

export default TableOfContents;
