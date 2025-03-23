import React, { useContext, useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "./images/transLogo2.png";
import { UserContext } from "../login/UserContext";
import { Dropdown, Menu } from "antd";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const handleLogout = () => {
    setUser(null); // Clear the user
    navigate("/"); // Redirect to homepage
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      toggleRef.current &&
      !toggleRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside); // Add for touch devices
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside); // Clean up
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <header className="app_header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={logoImage} alt="logo" className="logo-image" />
          <h1>StarFlicks Wiki</h1>
        </Link>
      </div>

      {/* Hamburger Menu Toggle */}
      <div className="menu-toggle" onClick={toggleMenu} ref={toggleRef}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`menu ${menuOpen ? "open" : ""}`} ref={menuRef}>
        <Link to="/">Home</Link>
        <Link to="/seriesList?type=series">Series</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/topSeries">Top Series</Link>
        <Link>Discord</Link>
        {/* <Link to="/filtered?type=movies">Movies</Link> */}
      </nav>
      <div className="search-icon">
        <div className="auth-button">
          {user ? (
            <Dropdown overlay={userMenu} placement="bottomRight" arrow>
              <span className="username-hover">{user.username}</span>
            </Dropdown>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
