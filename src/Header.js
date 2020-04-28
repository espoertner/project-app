import React from 'react';
import topper from './book-topper.jpg';

const Header = () => (
  <header>
    <img src={topper} className="App-topper" alt="topper" />
    <h1>Book App</h1>
    <ul className="main-nav">
      <li>Title</li>
      <li>Subject</li>
    </ul>    
  </header>
);

export default Header;