import React from "react";

const AdditionalContent = () => {
  return (
    <div className="additional_content">
      <h2 className="content-header" id="premise">
        Premise
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="content-header">Cast</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="content-header">Development</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <div className="references_section">
        <h2 className="content-header">References</h2>
        <ul className="reference_list">
          <li>
            <a
              href="https://screenrant.com/walking-dead-shows-spinoffs-upcoming-release-dates/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://screenrant.com/walking-dead-shows-spinoffs-upcoming-release-dates/
            </a>
          </li>
          <li>
            <a
              href="https://www.hollywoodreporter.com/lists/walking-dead-spinoffs-guide/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.hollywoodreporter.com/lists/walking-dead-spinoffs-guide/
            </a>
          </li>
          <li>
            <a
              href="https://www.hollywoodreporter.com/tv/tv-news/walking-dead-by-the-numbers-ratings-amc-1235265635/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.hollywoodreporter.com/tv/tv-news/walking-dead-by-the-numbers-ratings-amc-1235265635/
            </a>
          </li>
          <li>
            <a
              href="https://www.cinemablend.com/television/2482135/the-walking-dead-needs-life-support"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.cinemablend.com/television/2482135/the-walking-dead-needs-life-support
            </a>
          </li>
          {/* add more reference links here */}
        </ul>
      </div>
    </div>
  );
};
export default AdditionalContent;
