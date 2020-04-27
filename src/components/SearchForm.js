import React, { Component } from 'react';
import '../App.css';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export default class SearchForm extends Component {
  
  state = {
    searchText: '',
    books: {
        items: []
      },
    bookDetails: {
      items: []
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


  //currently showing error Unexpected token < in JSON at position 0
  moreDetails = async isbn => {
    const deets = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}&maxResults=1`);
    const details = await deets.json();
    this.setState({ bookDetails: details });
    console.log(details);
    this.setState({ isInfoShowing: true });
  };

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
                    onClick={() => this.moreDetails(book.volumeInfo.industryIdentifiers[0].identifier)}
                  >
                    {/* <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/> */}
                    <h3>{book.volumeInfo.title}</h3>
                    {book.volumeInfo.authors.map(author => (<p>{author}</p>))}
                  </li>
                ))}
              </ul>
          )} 
          </div>

      </div>   

    );
  }
}

//img thumbnail not working -- if book doesn't have image, thows error for whole page
//would like to truncate long titles
//want description to show on click
//break up title and subject onto different "pages"
//catch if search yields no results
//need media quieries to display several on a line