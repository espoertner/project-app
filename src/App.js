import React from 'react';
import SearchForm from './components/SearchForm';
import topper from './book-topper.jpg';
// import BookList from './components/BookList';
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
      <div>
        <SearchForm />
      </div>
      <div className="main-content">
          {/* <BookList /> */}
        </div>
    </div>
  );
}

export default App;
