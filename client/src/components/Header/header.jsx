import "./header.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/icons/home.svg";
import plusIcon from "../../assets/icons/plus.svg";
import { userContext } from "../../context/user.context";

const Header = () => {
  const { user } = useContext(userContext);

  const actions = user ? (
    <>
      <Link to="/addgame" className="img-anchor">
        <img className="img-header" src={plusIcon} alt="Add" />
      </Link>
    </>
  ) : (
    <>
      <Link to="/login">
        <button className="header__button">Login</button>
      </Link>
      <Link to="/registration">
        <button className="header__button">Sign up</button>
      </Link>
    </>
  );

  return (
    <header>
      <Link to="/" className="img-anchor">
        <img className="img-header" src={homeIcon} alt="Home" />
      </Link>
      <h3 className="header-title">Game World</h3>
      <div className="header__div">{actions}</div>
    </header>
  );
};

export default Header;
