import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./DetailPage.css";
import Footer from "./Footer";
import { getCharacterBySeriesId } from "../api/api";
import { Button, Spin } from "antd";
import Rating from "./ratings/Rating";
import { DownOutlined, EditOutlined, UpOutlined } from "@ant-design/icons";
import {
  showErrorNotification,
  showInfoNotification,
} from "../util/Notification";
import CommentSection from "./CommentSection";
import CommentSectionDisqus from "./CommentSectionDisqus";

// const characterData = [
//   { name: "Rick Grimes", img: "https://via.placeholder.com/100" },
//   { name: "Daryl Dixon", img: "https://via.placeholder.com/100" },
//   { name: "Carol Peletier", img: "https://via.placeholder.com/100" },
//   { name: "Maggie Rhee", img: "https://via.placeholder.com/100" },
//   { name: "Michonne Grimes", img: "https://via.placeholder.com/100" },
//   { name: "Rosita Espinosa", img: "https://via.placeholder.com/100" },
//   { name: "Judith Grimes", img: "https://via.placeholder.com/100" },
//   { name: "Eugene Porter", img: "https://via.placeholder.com/100" },
//   { name: "Carl Grimes", img: "https://via.placeholder.com/100" },
//   { name: "Glenn Rhee", img: "https://via.placeholder.com/100" },
//   { name: "Gabriel Stokes", img: "https://via.placeholder.com/100" },
//   { name: "Aaron", img: "https://via.placeholder.com/100" },
// ];

const DetailPage = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // const titleImage = location.state?.img || "https://via.placeholder.com/300";
  // const seriesData = location.state?.seriesData;
  // const seriesId = location.state?.seriesId;

  const [mainCharacters, setMainCharacters] = useState([]);
  const [groupedCharacters, setGroupedCharacters] = useState({});
  const [hasOtherCharacters, setHasOtherCharacters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exposedSections, setExposedSections] = useState({});
  const [seriesData, setSeriesData] = useState(null);
  const [seriesId, setSeriesId] = useState(null);
  const [titleImage, setTitleImage] = useState(null);
  const [error, setError] = useState(null);

  console.log("series data in detail page: ", seriesData);

  useEffect(() => {
    //retrieve series data from location.state or local storage
    const storedSeries = localStorage.getItem("selectedSeries");

    if (!storedSeries) {
      setError(
        "Series data not available. Please navigate from the home page."
      );
      setLoading(false);
      return;
    }

    const parsedSeries = JSON.parse(storedSeries);

    setSeriesData(parsedSeries);
    setSeriesId(parsedSeries.id);
    setTitleImage(parsedSeries.img);
  }, []);

  useEffect(() => {
    if (!seriesId) return;

    const fetchCharacters = async () => {
      try {
        const characters = await getCharacterBySeriesId(seriesId);

        console.log("characters in detailpage: ", characters);

        const main = [];
        const groupedCharacters = {};
        let otherExists = false;
        // const others = [] // add later

        characters.forEach((character) => {
          const characterData = {
            id: character.id,
            name: character.name,
            img: character.imageUrl || "https://via.placeholder.com/100",
            gender: character.gender,
            age: character.age,
            species: character.species,
            status: character.status,
            family: character.family,
            enemies: character.enemies,
            friends: character.friends,
            loveInterest: character.loveInterest,
            description: character.description,
            playedBy: character.playedBy?.realName,
            occupation: character.occupation,
            affiliation: character.affiliation,
            role: character.role,
            referencesData: character.referencesData,
            wikiUrl: character.playedBy?.wikiUrl,
            hasData: character.hasData,
          };

          if (character.role === "main character") {
            main.push(characterData);
          } else {
            const affiliation = character.affiliation || "Others";
            if (affiliation === "Others") {
              otherExists = true;
              // groupedCharacters[affiliation] = [];
            }
            if (!groupedCharacters[affiliation]) {
              groupedCharacters[affiliation] = [];
            }
            groupedCharacters[affiliation].push(characterData);
          }
        });
        setMainCharacters(main);
        setGroupedCharacters(groupedCharacters);
        setHasOtherCharacters(otherExists);
        // setCharacterDetails(characters);
      } catch (error) {
        console.error("Failed to fetch characters: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (seriesId) {
      fetchCharacters();
    }
  }, [seriesId]);

  if (loading) return <Spin size="large" tip="Loading details..." />;
  if (error) {
    showErrorNotification("Error Fetching Data!", error);
    return;
  }

  const handleTitleClick = () => {
    navigate(`/information/${title}`, {
      state: { seriesData },
    });
  };

  const handleCharacterClick = (character) => {
    console.log("character: ", character);
    if (!character.hasData) {
      showInfoNotification(
        "Notice!",
        "Data is currently not available for this character, please try again later."
      );
      return;
    }

    // Save character data to local storage
    localStorage.setItem("selectedCharacter", JSON.stringify(character));

    navigate(`/character/${character.name}`, {
      state: {
        // image: character.img,
        characterData: character,
      },
    });
  };

  const handleExposedCharacters = (affiliation) => {
    setExposedSections((prev) => ({
      ...prev,
      [affiliation]: !prev[affiliation], //toggle the specific affiliation
    }));
  };
  const BASE_URL = "http://localhost:8080";
  return (
    <div className="series_detail_page_wrapper">
      <Spin spinning={loading} size="large" tip="Loading details...">
        <div className="series_detail_page">
          <div className="main_panel_exclude_side_panel">
            <div className="content">
              <div className="title-add-btn">
                <h2 className="main_title">Series</h2>
                <Button
                  className="add-char-btn"
                  size="small"
                  onClick={() =>
                    navigate("/addSeriesCharacter", { state: { seriesId } })
                  }
                >
                  Add Series Characters
                </Button>
              </div>
              <div className="detail_title_img">
                <h2 className="title" onClick={handleTitleClick}>
                  {title}
                </h2>

                <img src={titleImage} alt="title" onClick={handleTitleClick} />
                <Rating seriesId={seriesData.id} />
              </div>

              <div className="characters_section">
                <h3 className="characters_title">Main Characters</h3>
                <div className="character_grid">
                  {/* {characterData.map((character, index) => ( */}
                  {mainCharacters.map((character, index) => (
                    <div key={index} className="character_card">
                      <img
                        src={`${character.img}`}
                        alt={character.name}
                        onClick={() => handleCharacterClick(character)}
                      />
                      <span>{character.name}</span>
                      <span className="character_name_subtext">
                        ({character.affiliation})
                      </span>
                      <div className="char-edit-btn">
                        <Button
                          className="char-edit-btn"
                          onClick={() => {
                            navigate("/addSeriesCharacter", {
                              state: {
                                seriesId,
                                // character,
                                characterId: character.id,
                                isEdit: true,
                              },
                            });
                          }}
                        >
                          <EditOutlined />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Other Characters Grouped by Affiliation */}

                {Object.entries(groupedCharacters)
                  // Sort affiliations alphabetically, but keep "Others" at the end
                  .sort(([a], [b]) => {
                    if (a === "Others") return 1;
                    if (b === "Others") return -1;
                    return a.localeCompare(b);
                  })
                  .map(([affiliation, characters]) => {
                    if (affiliation === "Other" && !hasOtherCharacters) {
                      return null; // skip rendering "others" if no unaffiliated characters exist
                    }
                    return (
                      <div key={affiliation}>
                        <div
                          className="detail_character_header_container"
                          onClick={() => handleExposedCharacters(affiliation)}
                        >
                          <h3 className="characters_title">{affiliation}</h3>
                          <div
                            className="detail_character_dropdown"
                            // onClick={() => handleExposedCharacters(affiliation)}
                          >
                            {exposedSections[affiliation] ? (
                              <DownOutlined />
                            ) : (
                              <UpOutlined />
                            )}
                          </div>
                        </div>
                        {exposedSections[affiliation] && (
                          <div className="character_grid">
                            {characters
                              .sort((charA, charB) =>
                                charA.name.localeCompare(charB.name)
                              )
                              .map((character) => (
                                <div
                                  key={character.id}
                                  className="character_card"
                                >
                                  <img
                                    src={character.img}
                                    alt={character.name}
                                    onClick={() =>
                                      handleCharacterClick(character)
                                    }
                                  />
                                  <p>{character.name}</p>
                                  {character.role !== null && (
                                    <span className="character_name_subtext">
                                      ({character.role})
                                    </span>
                                  )}
                                  <div className="char-edit-btn">
                                    <Button
                                      className="char-edit-btn"
                                      onClick={() =>
                                        navigate("/addSeriesCharacter", {
                                          state: {
                                            seriesId,
                                            // character,
                                            characterId: character.id,
                                          },
                                        })
                                      }
                                    >
                                      <EditOutlined />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="side_panel">
            <div className="panel_item">
              <h3>Discussion Threads</h3>
              <p>Chat with other users and hundreds of "{title}" fans!</p>
              <button>Join the Discussions</button>
            </div>

            <div className="panel_item">
              <h3>Blog Posts</h3>
              <p>Chat with other bloggers and hundreds of "{title}" fans!</p>
              <button>View Recent Blogs</button>
            </div>

            <div className="panel_item">
              <h3>Discord Server</h3>
              <p>
                Chat with fellow wiki editors and hundreds of "{title}" fans!
              </p>
              <button>Join the Server</button>
            </div>
          </div>
        </div>
      </Spin>
      {/* <Footer /> */}
      {/* <CommentSection /> */}

      <CommentSectionDisqus seriesId={seriesId} />
    </div>
  );
};

export default DetailPage;
