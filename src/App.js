import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import SubjectSearchForm from './components/SubjectSearchForm';
import Header from './Header';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div>
          <Route exact path="/title" component={SearchForm}/>
          <Route path="/subject" component={SubjectSearchForm}/>
        </div>
        <footer className="App-footer">

        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
