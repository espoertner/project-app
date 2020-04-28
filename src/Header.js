import React from 'react';
import topper from './book-topper.jpg';
import {Link} from 'react-router-dom';

const Header = () => (
  <header>
    <img src={topper} className="App-topper" alt="topper" />
    <h1>Book App</h1>
    <ul className="main-nav">
      <li><Link to="/title">Browse by Title</Link></li>
      <li><Link to="/subject">Browse by Subject</Link></li>
    </ul>    
  </header>
);

export default Header;