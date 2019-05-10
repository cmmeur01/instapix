import "../../assets/stylesheets/aboutus.css";
import React from "react";

export default function AboutUs() {
  return (
    <div className="container about-us">
      <h3>About Us</h3>
      <h5>Thank you for visiting Instapix.</h5>
      <h5>Instapix is a duplicate website inspired by Instagram.</h5>
      <h5>Instapix was built with the following technologies.</h5>
      <ul className="about-us-list">
        <li>Node/express for the backend.</li>
        <li>MongoDb for the database.</li>
        <li>React/Redux for the frontend.</li>
        <li>Bootstrap/css for the styling.</li>
      </ul>
      <h5>Instapix was built by a small team of collaborators.</h5>

      <h5>Please feel free to look around.</h5>
      <h5>
        Explore user profiles, like some posts, add some comments, upload a
        photo, and please visit us:
      </h5>

      <ul className="contact-us">
        <li>
          <h5>Sergey Gridin</h5>
          <p>
            <a href="https://github.com/SergeyGridin">Github</a>
          </p>
          <p>
            <a href="#">Linkedin</a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:gridin21@gmail.com" target="_top">
              gridin21@gmail.com
            </a>
          </p>
        </li>
        <li>
          <h5>Chris Muerer</h5>
          <p>
            <a href="https://github.com/cmmeur01/">Github</a>
          </p>
          <p>
            <a href="https://www.linkedin.com/in/chris-meurer-962b5a1b/">
              Linkedin
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:chrismeurer@gmail.com" target="_top">
              chrismeurer@gmail.com
            </a>
          </p>
        </li>
        <li>
          <h5>Martin Markaj</h5>
          <p>
            <a href="https://github.com/martmark">Github</a>
          </p>
          <p>
            <a href="#">Linkedin</a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:martinmarkaj@live.com" target="_top">
              martinmarkaj@live.com
            </a>
          </p>
        </li>
        <li>
          <h5>Koy Saeteurn</h5>
          <p>
            <a href="https://github.com/kscali">Github</a>
          </p>
          <p>
            <a href="https://www.linkedin.com/in/koychian-saeteurn-98169a167">
              Linkedin
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:kosatun@aol.com" target="_top">
              kosatun@aol.com
            </a>
          </p>
        </li>
      </ul>

      <h5>Hope to talk to you soon.</h5>
    </div>
  );
}
