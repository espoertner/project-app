import React, { Component } from 'react';
import '../App.css';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export default class SearchForm extends Component {
  
  state = {
    searchText: '',
    searchSubjectText: '',
    books: {
        items: []
      },
    booksSubject: {
      works: []
    },
    bookDetails: {
    },
    isInfoShowing: false,
  }
  
  onSearchChange = input => {
    this.setState({ searchText: input });
  };

  handleSubmit = e => {
    this.setState({ searchText: e.target.value });
    e.preventDefault();
    e.currentTarget.reset();
    this.fetchBooks();
  }
  
  fetchBooks = async ( 
    searchText = this.state.searchText,
    URL = `https://www.googleapis.com/books/v1/volumes?q=${searchText}&key=${apiKey}&maxResults=20`
) => {
    const response = await fetch(URL);
    const books = await response.json();
    this.setState({ books: books });
    console.log(books);
    };

  onSearchSubjectChange = input => {
    this.setState({ searchSubjectText: input });
  };

  handleSubjectSubmit = e => {
    this.setState({ searchSubjectText: e.target.value });
    e.preventDefault();
    e.currentTarget.reset();
    this.fetchSubjectBooks();
  }

  fetchSubjectBooks = async ( 
    searchSubjectText = this.state.searchSubjectText,
    URL = `http://openlibrary.org/subjects/${searchSubjectText}.json`
) => {
    const response = await fetch(URL);
    const subject = await response.json();
    this.setState({ booksSubject: subject });
    console.log(subject);
    };

  moreDetails = () => {
    
    this.setState({ isInfoShowing: true });
  }

  handleClose = () => {
    this.setState({ isInfoShowing: false });
  };

  render() {  
    return (
      <div>
        <form className="search-form" onSubmit={this.handleSubmit} >
          <input
            type="search"
            onChange={e => this.onSearchChange(e.target.value)}
            name="search"
            value={this.state.searchText}
            placeholder="Look for book by title"
          />
          <button type="submit" id="submit" className="search-button">Search</button>
        </form>

        <form className="search-form" onSubmit={this.handleSubjectSubmit} >
          <input
            type="search"
            onChange={e => this.onSearchSubjectChange(e.target.value)}
            name="search"
            value={this.state.searchSubjectText}
            placeholder="Look for book by subject"
          />
          <button type="submit" id="submit" className="search-button">Search</button>
        </form>

        <div id="main-content">
          {this.state.isInfoShowing ? (
            <div className="book-card-detail">
              <p>I want to to display the image, title, authors and descrpition from the selected book.</p>
              <button onClick={this.handleClose}>Exit</button>
            </div>
          ) : (
            <ul>
                {this.state.books.items.map(book => (
                  <li
                    className="books-card"
                    key={book.etag}
                    onClick={() => this.moreDetails()}
                  >
                    {/* <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/> */}
                    <h3>{book.volumeInfo.title}</h3>
                    {book.volumeInfo.authors.map(author => (<p>{author}</p>))}
                  </li>
                ))}

                {this.state.booksSubject.works.map(bookSub => (
                  <li
                    className="books-card"
                    key={bookSub.key}
                    onClick={() => this.moreDetails()}
                  >
                    {/* <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/> */}
                    <h3>{bookSub.title}</h3>
                    <p>{bookSub.authors[0].name}</p>
                  </li>
                ))}
              </ul>
          )} 
          </div>

      </div>   

    );
  }
}

//img thumbnail not working
//would like to truncate long titles
//want description to show on click
//break up title and subject onto different "pages"?
//catch if search yields no results
//need media quieries to display several on a line