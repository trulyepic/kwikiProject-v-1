import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./CharacterPage.css";
import CharacterContent from "./sections/CharacterContent";
import CharacterAdditionalContent from "./sections/CharacterAdditionalContent";
import CharacterDetailPanel from "./sections/CharacterDetailPanel";
import { getCharacterDetailByCharacterId } from "../../api/api";
import { Spin } from "antd";
import { showErrorNotification } from "../../util/Notification";

const CharacterPage = () => {
  const { characterName } = useParams();
  const location = useLocation();
  const [characterContent, setCharacterContent] = useState({});
  const [characterData, setCharacterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const characterImage =
  //   location.state?.image || "https://via.placeholder.com/200";

  // const characterData = location.state?.characterData;

  useEffect(() => {
    const storedCharacter = localStorage.getItem("selectedCharacter");

    const characterFromLocation = location.state?.characterData;

    if (characterFromLocation) {
      setCharacterData(characterFromLocation);
    } else if (storedCharacter) {
      const parsedCharacter = JSON.parse(storedCharacter);
      if (parsedCharacter.name === characterName) {
        setCharacterData(parsedCharacter);
      } else {
        setError(
          "Character data not available. Please navigate from the series page."
        );
        setLoading(false);
      }
    } else {
      setError(
        "Character data not available. Please navigate from the series page."
      );
      setLoading(false);
    }
  }, [characterName, location.state]);

  useEffect(() => {
    if (!characterData) return;

    const fetchContent = async () => {
      try {
        const content = await getCharacterDetailByCharacterId(characterData.id);
        console.log("character content from character page: ", content);
        setCharacterContent(content);
      } catch (error) {
        console.error("Failed to fetch content: ", error);
      } finally {
        setLoading(false);
      }
    };
    // if (characterData.id) {
    //   fetchContent();
    // }
    fetchContent();
  }, [characterData]);

  if (loading) return <Spin size="large" tip="Loading character details..." />;
  if (error) {
    showErrorNotification("Error Notice", error);
    return;
  }

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
      {/* <Footer /> */}
    </div>
  );
};

export default CharacterPage;
