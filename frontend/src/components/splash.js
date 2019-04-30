import React from 'react';
import SignupForm from './../components/session/signup_form_container';

const Splash = () => {
  return (
    <div>
      <article>
        <div>
          <img src='https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png' alt='instapix' />
        </div>
        <div>
          <SignupForm />
        </div>
      </article>
    </div>
  );
};

export default Splash;
