import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./DetailPage.css";
import Footer from "./Footer";
import { getCharacterBySeriesId } from "../api/api";

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
  const [supportingCharacters, setSupportingCharacters] = useState([]);
  const [otherCharacters, setOtherCharacters] = useState([]);
  // const [characterDetails, setCharacterDetails] = useState([]);

  console.log("series id: ", seriesId);
  // console.log("series data in detail page: ", seriesData);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const characters = await getCharacterBySeriesId(seriesId);

        console.log("characters in detailpage: ", characters);

        const main = [];
        const supporting = [];
        // const others = [] // add later

        characters.forEach((character) => {
          const characterData = {
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
            playedBy: character.playedBy?.realName,
          };

          if (character.role === "main character") {
            main.push(characterData);
          } else if (character.role === "supporting character") {
            supporting.push(characterData);
          }
        });
        setMainCharacters(main);
        setSupportingCharacters(supporting);
        // setCharacterDetails(characters);
      } catch (error) {
        console.error("Failed to fetch characters: ", error);
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
      <div className="series_detail_page">
        <div className="content">
          <h2 className="main_title">Series</h2>
          <div className="detail_title_img">
            <h2 className="title" onClick={handleTitleClick}>
              {title}
            </h2>

            <img src={titleImage} alt="title" onClick={handleTitleClick} />
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
                  <p>{character.name}</p>
                </div>
              ))}
            </div>
            <h3 className="characters_title">Supporting Characters</h3>
            <div className="character_grid">
              {characterData.map((character, index) => (
                <div
                  key={index}
                  className="character_card"
                  onClick={() => handleCharacterClick(character.name)}
                >
                  <img src={character.img} alt={character.name} />
                  <p>{character.name}</p>
                </div>
              ))}
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
            <p>Chat with fellow wiki editors and hundreds of "{title}" fans!</p>
            <button>Join the Server</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
