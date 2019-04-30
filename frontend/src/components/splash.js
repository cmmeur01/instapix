import React from "react";
import SignupForm from "./../components/session/signup_form_container";
import ImageAnimation from "../components/image_animation";

const Splash = () => {
  return (
    <div className="splash-main">
      <article>
        <div className="img-container container">
          <ImageAnimation />
        </div>
        <div className="form-component container">
          <SignupForm />
        </div>
      </article>
    </div>
  );
};

export default Splash;