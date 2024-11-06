import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="app_header">
      <div className="logo">
        <h1>version 1-0 KWiki</h1>
      </div>
      <nav className="menu">
        <Link to="/">Home</Link>
        <Link to="/filtered?type=series">Series</Link>
        {/* <Link to="/filtered?type=movies">Movies</Link> */}
      </nav>
      <div className="search-icon">
        <span role="img" aria-label="search">
          🔍
        </span>
      </div>
    </header>
  );
};

export default Header;
