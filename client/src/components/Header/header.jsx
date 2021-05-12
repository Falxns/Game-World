import "./header.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/icons/home.svg";
import plusIcon from "../../assets/icons/plus.svg";
import { userContext } from "../../context/user.context";
import adminIcon from "../../assets/icons/admin.svg";

const Header = () => {
  const { user, setUser } = useContext(userContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const actions = user ? (
    <>
      <p className="header__nickname">Hi, {user.data.nickname}</p>
      <button
        onClick={handleLogout}
        className="header__a_button header__button"
      >
        Logout
      </button>
      <Link to="/addgame" className="header__a header__a_icon">
        <img className="header__img" src={plusIcon} alt="add" />
      </Link>
    </>
  ) : (
    <>
      <Link to="/login" className="header__a_button">
        <button className="header__button">Login</button>
      </Link>
      <Link to="/registration" className="header__a_button">
        <button className="header__button">Sign up</button>
      </Link>
    </>
  );

  const pages =
    user && user.data.isAdmin ? (
      <>
        <Link to="/" className="header__a header__a_icon">
          <img className="header__img" src={homeIcon} alt="home" />
        </Link>
        <Link to="/admin" className="header__a header__a_icon">
          <img className="header__img" src={adminIcon} alt="admin" />
        </Link>
      </>
    ) : (
      <Link to="/" className="header__a header__a_icon">
        <img className="header__img" src={homeIcon} alt="home" />
      </Link>
    );

  return (
    <header className="header">
      <div className="header__div">{pages}</div>
      <h3 className="header__title">Game World</h3>
      <div className="header__div">{actions}</div>
    </header>
  );
};

export default Header;
