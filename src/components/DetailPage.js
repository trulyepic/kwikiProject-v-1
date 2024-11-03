import React from "react";
import { useParams } from "react-router-dom";
import "./DetailPage.css";
import Footer from "./Footer";

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

  return (
    <div className="series_detail_page_wrapper">
      <div className="series_detail_page">
        <div className="content">
          <h2 className="main_title">Series</h2>
          <h2 className="title">{title}</h2>

          <div className="characters_section">
            <h3 className="characters_title">Characters</h3>
            <div className="character_grid">
              {characterData.map((character, index) => (
                <div key={index} className="character_card">
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
