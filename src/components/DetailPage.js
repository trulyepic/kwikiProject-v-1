import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./DetailPage.css";
import Footer from "./Footer";
import { getCharacterBySeriesId } from "../api/api";
import { Spin } from "antd";
import Rating from "./ratings/Rating";

const characterData = [
  { name: "Rick Grimes", img: "https://via.placeholder.com/100" },
  { name: "Daryl Dixon", img: "https://via.placeholder.com/100" },
  { name: "Carol Peletier", img: "https://via.placeholder.com/100" },
  { name: "Maggie Rhee", img: "https://via.placeholder.com/100" },
  { name: "Michonne Grimes", img: "https://via.placeholder.com/100" },
  { name: "Rosita Espinosa", img: "https://via.placeholder.com/100" },
  { name: "Judith Grimes", img: "https://via.placeholder.com/100" },
  { name: "Eugene Porter", img: "https://via.placeholder.com/100" },
  { name: "Carl Grimes", img: "https://via.placeholder.com/100" },
  { name: "Glenn Rhee", img: "https://via.placeholder.com/100" },
  { name: "Gabriel Stokes", img: "https://via.placeholder.com/100" },
  { name: "Aaron", img: "https://via.placeholder.com/100" },
];

const DetailPage = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const titleImage = location.state?.img || "https://via.placeholder.com/300";
  const seriesData = location.state?.seriesData;

  const seriesId = location.state?.seriesId;
  const [mainCharacters, setMainCharacters] = useState([]);
  const [groupedCharacters, setGroupedCharacters] = useState({});
  const [hasOtherCharacters, setHasOtherCharacters] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("series id: ", seriesId);
  console.log("series data in detail page: ", seriesData);

  useEffect(() => {
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
            img:
              character.imageUrl === null
                ? "https://via.placeholder.com/100"
                : character.imageUrl,
            gender: character.gender,
            age: character.age,
            species: character.species,
            status: character.status,
            family: character.family,
            enemies: character.enemies,
            friends: character.friends,
            description: character.description,
            playedBy: character.playedBy?.realName,
            occupation: character.occupation,
            affiliation: character.affiliation,
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

  const handleTitleClick = () => {
    navigate(`/information/${title}`, {
      state: { seriesData },
    });
  };

  const handleCharacterClick = (character) => {
    navigate(`/character/${character.name}`, {
      state: {
        // image: character.img,
        characterData: character,
      },
    });
  };
  const BASE_URL = "http://localhost:8080";
  return (
    <div className="series_detail_page_wrapper">
      <Spin spinning={loading} size="large" tip="Loading details...">
        <div className="series_detail_page">
          <div className="content">
            <h2 className="main_title">Series</h2>
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
                  <div
                    key={index}
                    className="character_card"
                    onClick={() => handleCharacterClick(character)}
                  >
                    <img src={`${character.img}`} alt={character.name} />
                    <span>{character.name}</span>
                    <span className="character_name_subtext">
                      ({character.affiliation})
                    </span>
                  </div>
                ))}
              </div>
              {/* Other Characters Grouped by Affiliation */}

              {Object.entries(groupedCharacters)
                // Ensure "Other" is the last section
                .sort(([a], [b]) =>
                  a === "Others" ? 1 : b === "Others" ? -1 : 0
                )
                .map(([affiliation, characters]) => {
                  if (affiliation === "Other" && !hasOtherCharacters) {
                    return null; // skip rendering "others" if no unaffiliated characters exist
                  }
                  return (
                    <div key={affiliation}>
                      <h3 className="characters_title">{affiliation}</h3>
                      <div className="character_grid">
                        {characters.map((character) => (
                          <div
                            key={character.id}
                            className="character_card"
                            onClick={() => handleCharacterClick(character)}
                          >
                            <img src={character.img} alt={character.name} />
                            <p>{character.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
      <Footer />
    </div>
  );
};

export default DetailPage;
