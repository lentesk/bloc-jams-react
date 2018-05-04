import React from 'react';
import './landing.css';
import './InstantMessenger.scss'
import { Route, Link } from 'react-router-dom';


const Landing = () => (
  <section className="landing">
    <h1 className="hero-title">Jameson Title</h1>

  <section className="container">
    <div className="card">
      <div className="aim">This is where the instant messenger will go</div>
    </div>
    <div className="card">
      <div className="enterbutton">
      <Link to='/library'><button className="enter"></button></Link>
      </div>
    </div>
   </section>
   <div className="links">
   <a href="https://soundcloud.com/prodbyjameson">SoundCloud</a>
   <a href="https://prodbyjameson.bandcamp.com">Bandcamp</a>
   <a href="https://www.instagram.com/prodbyjameson/">Instagram</a>
   </div>
  </section>
);

export default Landing;
