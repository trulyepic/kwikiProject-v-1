import React from "react";
import TableOfContents from "./TableOfContents";

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const Content = ({ seriesContent }) => {
  console.log("series content in content: ", seriesContent);
  return (
    <div className="summary_text">
      <div>
        {seriesContent?.description ? (
          seriesContent.description.split("\\n\\n").map((paragraph, index) => (
            <React.Fragment key={index}>
              <p>{paragraph.trim()}</p>
              {index !==
                seriesContent.description.split("\\n\\n").length - 1 && <br />}
            </React.Fragment>
          ))
        ) : (
          <p>No description available.</p>
        )}
      </div>
      {/* <div>
        {seriesContent?.description ? (
          seriesContent.description
            .split("\\n\\n")
            .map((paragraph, index) => <p key={index}>{paragraph.trim()}</p>)
        ) : (
          <p>No description available.</p>
        )}
      </div> */}

      <TableOfContents
        scrollToSection={scrollToSection}
        seriesContent={seriesContent}
      />
    </div>
  );
};
export default Content;
