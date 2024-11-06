import React from "react";
import GridItem from "./GridItem";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const series = [
    { title: "Grotesquerie", img: "https://via.placeholder.com/200" },
    { title: "Doctor Odyssey", img: "https://via.placeholder.com/200" },
    { title: "Chief Detective 1958", img: "https://via.placeholder.com/200" },
    { title: "Uncle Samsik", img: "https://via.placeholder.com/200" },
    { title: "Uncle Samsik", img: "https://via.placeholder.com/200" },
    { title: "Uncle Samsik", img: "https://via.placeholder.com/200" },
    { title: "She Taught Love", img: "https://via.placeholder.com/200" },
    { title: "Perfect Days", img: "https://via.placeholder.com/200" },
    { title: "The Promised Land", img: "https://via.placeholder.com/200" },
    { title: "The First Omen", img: "https://via.placeholder.com/200" },
    { title: "The First Omen", img: "https://via.placeholder.com/200" },
    { title: "The First Omen", img: "https://via.placeholder.com/200" },
  ];

  const movies = [
    { title: "She Taught Love", img: "https://via.placeholder.com/200" },
    { title: "Perfect Days", img: "https://via.placeholder.com/200" },
    { title: "The Promised Land", img: "https://via.placeholder.com/200" },
    { title: "The First Omen", img: "https://via.placeholder.com/200" },
    { title: "The First Omen", img: "https://via.placeholder.com/200" },
    { title: "The First Omen", img: "https://via.placeholder.com/200" },
  ];

  const handleMoreClick = (type) => {
    navigate(`/filtered?type=${type}`);
  };

  return (
    <div className="app_grid">
      {/* <div className="grid_section">
        
      </div> */}
      <h2>Series</h2>

      <div className="grid_container">
        {series.map((show, index) => (
          <GridItem key={index} title={show.title} img={show.img} />
        ))}
      </div>
      <button className="more_button" onClick={() => handleMoreClick("series")}>
        More
      </button>

      {/* <h2>Movies</h2>
      <div className="grid_container">
        {movies.map((movie, index) => (
          <GridItem key={index} title={movie.title} img={movie.img} />
        ))}
      </div>
      <button className="more_button">More</button> */}
    </div>
  );
};

export default HomePage;
