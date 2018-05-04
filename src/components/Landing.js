import React from 'react';
import './landing.css';
import { Route, Link } from 'react-router-dom';
import InstantMessenger from './InstantMessenger.js';
import './InstantMessenger.scss'
import './InstantMessenger.css'




const Landing = () => (
<section className="landing">
  <div className="container">
    <div className="card1">
      <div className="aim">
        <InstantMessenger/>
      </div>
    </div>
    <div className="card2">
      <div className="enterbutton">
      <Link to='/library'><button className="enter"></button></Link>
      </div>
    </div>
   </div>
   <div className="links">
   <a href="https://soundcloud.com/prodbyjameson">SoundCloud</a>
   <a href="https://prodbyjameson.bandcamp.com">Bandcamp</a>
   <a href="https://www.instagram.com/prodbyjameson/">Instagram</a>
   </div>
  </section>
);

export default Landing;
