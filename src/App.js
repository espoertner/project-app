import React from 'react';
import SearchForm from './components/SearchForm';
import SubjectSearchForm from './components/SubjectSearchForm';
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
        <SubjectSearchForm />
      </div>
      <footer className="App-footer">

      </footer>
    </div>
  );
}

export default App;
