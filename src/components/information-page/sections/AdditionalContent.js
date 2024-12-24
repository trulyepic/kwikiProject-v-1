import React from "react";

const AdditionalContent = ({ seriesContent }) => {
  // Function to render paragraphs for the synopsis section with spacing
  const renderSynopsisParagraphs = (content) => {
    return content
      .split(/\n\n|\\n\\n/) // Split by double newlines
      .filter((paragraph) => paragraph.trim() !== "") // Remove empty lines
      .map((paragraph, index) => (
        <React.Fragment key={index}>
          <p className="content-text">{paragraph.trim()}</p>
          {index !== content.split(/\n\n|\\n\\n/).length - 1 && <br />}{" "}
          {/* Add spacing */}
        </React.Fragment>
      ));
  };

  // Function to render references with links
  const renderReferences = (content, className) => {
    return (
      <ul className={`${className} reference_list`}>
        {content.split(/,|\\n/).map((ref, index) => {
          const trimmedRef = ref.trim();
          // Check if the reference is a URL
          const isLink = /^https?:\/\//.test(trimmedRef);
          return (
            <li key={index} className={className}>
              <span className="link-numb">[{index + 1}]</span>
              {isLink ? (
                <a href={trimmedRef} target="_blank" rel="noopener noreferrer">
                  {trimmedRef}
                </a>
              ) : (
                trimmedRef
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderContent = (content) => {
    if (!content) return null; // Handle empty or undefined content

    // Replace escaped newline characters (\\n) with actual newlines (\n)
    const normalizedContent = content
      .replace(/\\n/g, "\n")
      .replace(/\n/g, "\n\n"); // Ensure double newlines for paragraphs

    // Split content into blocks by double newlines
    return normalizedContent
      .split(/\n\n/) // Double newline indicates a new block
      .map((block, index) => {
        if (block.trim().startsWith("##")) {
          // Render headings without a <br />
          return (
            <h3 key={index} className="content-sub-header-text">
              {block.replace("##", "").trim()}
            </h3>
          );
        }
        // Render paragraphs with a <br />
        return (
          <React.Fragment key={index}>
            <p className="content-text content-paragraph-spacing">
              {block.trim()}
            </p>
          </React.Fragment>
        );
      });
  };

  // Function to render awards and nominations
  const renderAwardsAndNominations = (content) => {
    try {
      // Attempt to parse the content as JSON
      const parsedContent = JSON.parse(content);
      if (typeof parsedContent === "object" && !Array.isArray(parsedContent)) {
        return (
          <ul className="awards-list">
            {Object.entries(parsedContent).map(([award, detail], index) => (
              <li key={index}>
                <span>{award}:</span> {detail}
              </li>
            ))}
          </ul>
        );
      }
    } catch (e) {
      // If parsing fails, render as plain text
    }
    return <p className="content-text">{content}</p>;
  };

  const sections = [
    {
      key: "synopsis",
      label: "Synopsis",
      render: (content) => renderSynopsisParagraphs(content),
    },
    {
      key: "development",
      label: "Development",
      render: (content) => renderContent(content),
    },
    {
      key: "receptionAndImpact",
      label: "Reception and Impact",
      render: (content) => renderContent(content),
    },
    {
      key: "awardsAndNominations",
      label: "Awards and Nominations",
      render: (content) => renderAwardsAndNominations(content),
    },
    {
      key: "references",
      label: "References",
      render: (content) => renderReferences(content, "content-text"),
    },
  ];
  return (
    <div className="additional_content">
      {sections.map((section) => {
        const content = seriesContent[section.key];
        if (!content) return null; // Skip sections without content

        return (
          <div key={section.key}>
            <h2 className="content-header" id={section.key}>
              {section.label}
            </h2>
            {section.render(content)}
          </div>
        );
      })}
    </div>
  );
};
export default AdditionalContent;
