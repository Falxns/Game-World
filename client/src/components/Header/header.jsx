import "./header.css";
import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/icons/home.svg";
import plusIcon from "../../assets/icons/plus.svg";

const Header = () => {
  return (
    <header>
      <Link to="/" className="img-anchor">
        <img className="img-header" src={homeIcon} alt="Home" />
      </Link>
      <h3 className="header-title">Game World</h3>
      <Link to="/addgame" className="img-anchor">
        <img className="img-header" src={plusIcon} alt="Add" />
      </Link>
    </header>
  );
};

export default Header;
