import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className="footer">
      <nav className="footer-links">
        <ul className="footer-links-list">
          <li className="footer-li" key={0}>
            <Link to="/aboutus">ABOUT US</Link>
          </li>
          <li className="footer-li" key={1}>
            <Link to="/aboutus">SUPPORT</Link>
          </li>
          <li className="footer-li" key={2}>
            <a href="https://instagram-press.com/">PRESS</a>
          </li>
          <li className="footer-li" key={3}>
            <a href="https://www.instagram.com/developer/">API</a>
          </li>
          <li className="footer-li" key={4}>
            <a href="https://www.instagram.com/about/jobs/">JOBS</a>
          </li>
          <li className="footer-li" key={5}>
            <a href="https://help.instagram.com/519522125107875">PRIVACY</a>
          </li>
          <li className="footer-li" key={6}>
            <a href="https://help.instagram.com/581066165581870">TERMS</a>
          </li>
          <li className="footer-li" key={7}>
            <a href="https://www.instagram.com/explore/locations/">DIRECTORY</a>
          </li>
          <li className="footer-li" key={8}>
            <a href="https://www.instagram.com/directory/profiles/">PROFILES</a>
          </li>
          <li className="footer-li" key={9}>
            <a href="https://www.instagram.com/directory/hashtags/">HASHTAGS</a>
          </li>
          <li className="footer-li" key={10}>
            LANGUAGE
          </li>
        </ul>
      </nav>
      <span className="copyright">© 2019 INSTAPIX</span>
    </div>
  );
};

export default footer;
