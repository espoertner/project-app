import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import SubjectSearchG from './components/SubjectSearchG';
import AuthorSearch from './components/AuthorSearch';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div>
          <Route exact path="/title" component={SearchForm}/>
          <Route path="/subject" component={SubjectSearchG}/>
          <Route path="/author" component={AuthorSearch}/>
        </div>
        <footer className="App-footer">

        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
