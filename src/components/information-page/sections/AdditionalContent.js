import React from "react";

const AdditionalContent = () => {
  return (
    <div className="additional_content">
      <h2 className="content-header" id="premise">
        Premise
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="content-header" id="cast">
        Cast
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="content-header" id="development">
        Development
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="content-header" id="awards and nominations">
        Awards and Nominations
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="content-header" id="seasons">
        Seasons
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <ul>
        <li className="content-sub-header" id="season 1">
          Season 1
        </li>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <li className="content-sub-header" id="season 2">
          Season 2
        </li>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      </ul>

      <div className="references_section" id="references">
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
