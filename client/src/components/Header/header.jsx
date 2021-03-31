import "./header.css";
import React from "react";
import homeIcon from "../../assets/icons/home.svg";
import plusIcon from "../../assets/icons/plus.svg";

const Header = () => {
  return (
    <header>
      <a href="/" className="img-anchor">
        <img className="img-header" src={homeIcon} alt="Home" />
      </a>
      <h3 className="header-title">Game World</h3>
      <a href="/pages/addgame.html" className="img-anchor">
        <img className="img-header" src={plusIcon} alt="Add" />
      </a>
    </header>
  );
};

export default Header;
