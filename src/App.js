import React from 'react';
import topper from './book-topper.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={topper} className="App-topper" alt="topper" />
        <h1>Book App</h1>
        <p>
          Search for a book, leave reviews and more. Powered by Goodreads.
        </p>
      </header>
    </div>
  );
}

export default App;
