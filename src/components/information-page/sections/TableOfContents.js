import React from "react";

const TableOfContents = ({ scrollToSection }) => {
  return (
    <div className="table_of_contents">
      <h3>Contents</h3>
      <ul>
        <li onClick={() => scrollToSection("premise")}>1. Premise</li>
        <li onClick={() => scrollToSection("cast")}>2. Cast</li>
        <li onClick={() => scrollToSection("development")}>3. Development</li>
        <li onClick={() => scrollToSection("distribution")}>4. Distribution</li>
        <li onClick={() => scrollToSection("awards and nominations")}>
          5. Awards and Nominations
        </li>
        <li onClick={() => scrollToSection("seasons")}>
          6. Seasons
          {/* <ul>
            6.1. Seasons */}
          <ul>
            <li onClick={() => scrollToSection("season 1")}>6.1.1. Season 1</li>
            <li onClick={() => scrollToSection("season 2")}>6.1.2. Season 2</li>
          </ul>
          {/* <li>6.3. Behind the Scenes</li> */}
          {/* </ul> */}
        </li>
        {/* <li>7. External Links</li> */}
        <li onClick={() => scrollToSection("references")}>8. References</li>
      </ul>
    </div>
  );
};

export default TableOfContents;
