import "./footer.css";
import React from "react";
import vk from "../../assets/icons/vk.svg";
import inst from "../../assets/icons/instagram.svg";
import twitter from "../../assets/icons/twitter.svg";

const Footer = () => {
  return (
    <footer>
      <p className="footer-p">Contact us:</p>
      <a
        href="https://vk.com"
        target="_blank"
        rel="noreferrer noopener"
        className="img-anchor"
      >
        <img className="footer-icon" src={vk} alt="VK" />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noreferrer noopener"
        className="img-anchor"
      >
        <img className="footer-icon" src={inst} alt="Instagram" />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noreferrer noopener"
        className="img-anchor"
      >
        <img className="footer-icon" src={twitter} alt="Twitter" />
      </a>
      <p className="footer-p">©2021</p>
    </footer>
  );
};

export default Footer;
