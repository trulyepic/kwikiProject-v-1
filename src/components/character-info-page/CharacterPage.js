import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./CharacterPage.css";
import Footer from "../Footer";
import CharacterContent from "./sections/CharacterContent";
import CharacterAdditionalContent from "./sections/CharacterAdditionalContent";
import CharacterDetailPanel from "./sections/CharacterDetailPanel";
import { getCharacterDetailByCharacterId } from "../../api/api";

const CharacterPage = () => {
  const { characterName } = useParams();
  const location = useLocation();
  const [characterContent, setCharacterContent] = useState({});
  // const characterImage =
  //   location.state?.image || "https://via.placeholder.com/200";

  const characterData = location.state?.characterData;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await getCharacterDetailByCharacterId(characterData.id);
        console.log("character content from character page: ", content);
        setCharacterContent(content);
      } catch (error) {
        console.error("Failed to fetch content: ", error);
      }
    };
    if (characterData.id) {
      fetchContent();
    }
  }, [characterData.id]);

  console.log("character Data in CharacterPage: ", characterData);

  return (
    <div className="character_page_wrapper">
      <div className="character_page_content">
        <div className="character_information_page">
          <div className="character_page_header">
            <span>{characterName}</span>
          </div>
          <div className="character_main_content">
            <CharacterContent
              characterData={characterData}
              characterContent={characterContent}
            />

            {/*Details Panel */}
            <CharacterDetailPanel
              // characterImage={characterImage}
              // characterName={characterName}
              characterData={characterData}
            />
          </div>

          {/* Table of Contents */}

          <CharacterAdditionalContent
            characterContent={characterContent}
            characterRef={characterData.referencesData}
          />

          <div className="ai-special-footnote">
            Some information about Extraordinary Attorney Woo was derived from a
            conversation with an AI assistant on December 20, 2024
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
