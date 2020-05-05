//imports
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
//components
import SearchForm from './components/SearchForm';
import SubjectSearchG from './components/SubjectSearchG';
import AuthorSearch from './components/AuthorSearch';
import Header from './components/Header';
//style sheet
import './App.css';

//top level of app
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div>
          {/* Three navigable routs to search by different fields */}
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