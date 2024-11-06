import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./CharacterPage.css";
import Footer from "../Footer";

const CharacterTableOfContents = () => {
  return (
    <div className="character_table_of_contents">
      <h3>Contents</h3>
      <ul>
        <li>
          1. Biography
          <ul>
            <li>1.1. Early life</li>
            <li>1.2. Life at Angelville</li>
            <li>1.3. Criminal life</li>
            <li>1.4. Corruption to Genesis and redemption</li>
            <li>1.5. Search for God</li>
            <li>1.6. Following the jazz</li>
            <li>1.7. The Messiah</li>
            <li>1.8. Return to Angelville</li>
          </ul>
        </li>
        <li>
          2. Powers and abilities
          <ul>
            <li>2.1. Powers</li>
            <li>2.2. Limitations</li>
            <li>2.3. Abilities</li>
          </ul>
        </li>
        <li>3. Personality</li>
        <li>4. Relationships</li>
      </ul>
    </div>
  );
};

const CharacterAdditionalContent = () => {
  return (
    <div className="character_additional_content">
      <h2 className="character-content-header" id="premise">
        Premise
      </h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="character-content-header">Cast</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>

      <h2 className="character-content-header">Development</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
    </div>
  );
};

const CharacterPage = () => {
  const { characterName } = useParams();
  const location = useLocation();
  const characterImage =
    location.state?.image || "https://via.placeholder.com/200";

  return (
    <div>
      <div className="character_page_wrapper">
        <div className="character_page_content">
          {/* Character Name */}

          {/* Character Summary Text */}
          <div className="character_summary_text">
            <span className="character_name">{characterName}</span>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              ac magna at orci varius venenatis. Nulla quis risus vitae felis
              scelerisque efficitur. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Praesent ac magna at orci varius venenatis.
            </p>
            <p>
              Further details about the character, including background,
              achievements, and storyline information that flows around the
              character details and image.
            </p>
            <CharacterTableOfContents />
          </div>

          {/* Character Image and Details aligned to the right */}
          <div className="character_info">
            <h2 className="character_detail_name">{characterName}</h2>
            <img
              src={characterImage}
              alt={characterName}
              className="character_image"
            />
            <div className="character_details">
              <div className="character_box">
                <div className="character_item">
                  <span className="character_label">Actor</span>
                  <span className="character_value">Jakie</span>
                </div>
                <div className="character_item">
                  <span className="character_label">Gender</span>
                  <span className="character_value">Male</span>
                </div>
                <div className="character_item">
                  <span className="character_label">Age</span>
                  <span className="character_value">30</span>
                </div>
                <div className="character_item">
                  <span className="character_label">Occupation</span>
                  <span className="character_value">
                    <ul>
                      <li>Dancer</li>
                      <li>Fighter</li>
                    </ul>
                  </span>
                </div>
                <div className="character_item">
                  <span className="character_label">Family</span>
                  <span className="character_value">
                    <ul className="detail_item-ul">
                      <li>Mother - Ruth</li>
                      <li>Father - Luke</li>
                      <li>Sister - Sis</li>
                      <li>Brother - bro</li>
                    </ul>
                  </span>
                </div>

                <div className="character_item">
                  <span className="character_label">Enemies</span>
                  <span className="character_value">
                    <ul className="detail_item-ul">
                      <li>Jake</li>
                      <li>Faith</li>
                      <li>Made</li>
                      <li>Yoo</li>
                    </ul>
                  </span>
                </div>
                <div className="character_item">
                  <span className="character_label">Status</span>
                  <span className="character_value">Alive</span>
                </div>
                <div className="detail_item">
                  <span className="character_label">Episode Count</span>
                  <span className="character_value">3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Side Panel */}
        <div className="side_panel">
          <div className="panel_item">Ad Placeholder</div>
          <div className="panel_item">Ad Placeholder</div>
          <div className="panel_item">Related Links</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CharacterPage;
