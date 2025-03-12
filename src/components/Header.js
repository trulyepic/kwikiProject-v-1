import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logoImage from "./images/transLogo2.png";

const Header = () => {
  return (
    <header className="app_header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={logoImage} alt="logo" className="logo-image" />
          <h1>Star K-wiki</h1>
        </Link>
      </div>
      <nav className="menu">
        <Link to="/">Home</Link>
        <Link to="/seriesList?type=series">Series</Link>
        <Link to="/contact">Contact Us</Link>
        <Link>Discord</Link>
        {/* <Link to="/filtered?type=movies">Movies</Link> */}
      </nav>
      <div className="search-icon">
        {/* <span role="img" aria-label="search">
          🔍
        </span> */}
      </div>
    </header>
  );
};

export default Header;
