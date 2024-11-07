import React from "react";
import { useLocation, useParams } from "react-router-dom";
import "./CharacterPage.css";
import Footer from "../Footer";
import CharacterContent from "./sections/CharacterContent";
import CharacterAdditionalContent from "./sections/CharacterAdditionalContent";
import CharacterDetailPanel from "./sections/CharacterDetailPanel";

const CharacterPage = () => {
  const { characterName } = useParams();
  const location = useLocation();
  const characterImage =
    location.state?.image || "https://via.placeholder.com/200";

  return (
    <div className="character_page_wrapper">
      <div className="character_page_content">
        <div className="character_information_page">
          <div className="character_page_header">
            <span>{characterName}</span>
          </div>
          <div className="character_main_content">
            <CharacterContent />

            {/*Details Panel */}
            <CharacterDetailPanel
              characterImage={characterImage}
              characterName={characterName}
            />
          </div>

          {/* Table of Contents */}

          <CharacterAdditionalContent />
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
