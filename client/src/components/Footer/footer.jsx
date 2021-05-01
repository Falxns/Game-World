import "./footer.css";
import React from "react";
import vk from "../../assets/icons/vk.svg";
import inst from "../../assets/icons/instagram.svg";
import twitter from "../../assets/icons/twitter.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__p">Contact us:</p>
      <a
        href="https://vk.com"
        target="_blank"
        rel="noreferrer noopener"
        className="footer__a"
      >
        <img className="footer__img" src={vk} alt="vk" />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noreferrer noopener"
        className="footer__a"
      >
        <img className="footer__img" src={inst} alt="instagram" />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noreferrer noopener"
        className="footer__a"
      >
        <img className="footer__img" src={twitter} alt="twitter" />
      </a>
      <p className="footer__p">©2021</p>
    </footer>
  );
};

export default Footer;
