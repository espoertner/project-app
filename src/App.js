//imports
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//components
import SearchForm from './components/SearchForm';
import SubjectSearchG from './components/SubjectSearchG';
import AuthorSearch from './components/AuthorSearch';
import Header from './components/Header';
import NotFound from './components/NotFound';

//style sheet
import './App.css';

//top level of app
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div>
          <Switch>
            {/* Three navigable routs to search by different fields */}
            <Route exact path="/" />
            <Route path="/title" component={SearchForm} />
            <Route path="/subject" component={SubjectSearchG} />
            <Route path="/author" component={AuthorSearch} />
            <Route component={NotFound} />
          </Switch>  
        </div>
        <footer className="App-footer">

        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;