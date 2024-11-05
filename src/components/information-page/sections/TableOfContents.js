import React from "react";

const TableOfContents = ({ scrollToSection }) => {
  return (
    <div className="table_of_contents">
      <h3>Contents</h3>
      <ul>
        <li onClick={() => scrollToSection("premise")}>1. Premise</li>
        <li>2. Cast</li>
        <li>3. Development</li>
        <li>4. Distribution</li>
        <li>5. Awards and Nominations</li>
        <li>
          6. Seasons
          <ul>
            6.1. Posters
            <ul>
              <li>6.1.1. Season 1</li>
              <li>6.1.2. Season 2</li>
            </ul>
            {/* <li>6.3. Behind the Scenes</li> */}
          </ul>
        </li>
        <li>7. External Links</li>
        <li>8. References</li>
      </ul>
    </div>
  );
};

export default TableOfContents;
