import React from 'react';


const footer = () => {
  return (
    <div className='footer'>
      <nav className='footer-links'>
        <ul className='footer-links-list'>
          <li className='footer-li' key={0}>ABOUT US</li>
          <li className='footer-li' key={1}>SUPPORT</li>
          <li className='footer-li' key={2}>PRESS</li>
          <li className='footer-li' key={3}>API</li>
          <li className='footer-li' key={4}>JOBS</li>
          <li className='footer-li' key={5}>PRIVACY</li>
          <li className='footer-li' key={6}>TERMS</li>
          <li className='footer-li' key={7}>DIRECTORY</li>
          <li className='footer-li' key={8}>PROFILES</li>
          <li className='footer-li' key={9}>HASHTAGS</li>
          <li className='footer-li' key={10}>LANGUAGE</li>
        </ul>
      </nav>
      <span className='copyright'>© 2019 INSTAPIX</span>
    </div>
  )
};

export default footer;