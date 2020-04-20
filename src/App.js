import React from 'react';
import SearchForm from './components/SearchForm';
import topper from './book-topper.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={topper} className="App-topper" alt="topper" />
        <h1>Book App</h1>
      </header>
      <div>
        <SearchForm />
      </div>
    </div>
  );
}

export default App;
