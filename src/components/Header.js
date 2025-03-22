import React, { useContext } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "./images/transLogo2.png";
import { UserContext } from "../login/UserContext";
import { Dropdown, Menu } from "antd";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear the user
    navigate("/"); // Redirect to homepage
  };

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
      <nav className="menu">
        <Link to="/">Home</Link>
        <Link to="/seriesList?type=series">Series</Link>
        <Link to="/contact">Contact Us</Link>
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
        {/* <span role="img" aria-label="search">
          🔍
        </span> */}
      </div>
    </header>
  );
};

export default Header;
