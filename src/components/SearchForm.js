//imports
import React, { Component } from 'react';
import '../App.css';

//imports Google Books API key from untracked .env file
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

//title search component
export default class SearchForm extends Component {
  
  state = {
    searchText: '',
    books: [],
    bookDetails: {},
    currentISBN: {
    },
    openLib: {
    },
    didOpenLibRes: false,
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
  
  //handles fetching list of books from Google Books API
  fetchBooks = async ( 
    searchText = this.state.searchText,
    URL = `https://www.googleapis.com/books/v1/volumes?q=+intitle:${searchText}&key=${apiKey}&maxResults=20`
) => {
    const response = await fetch(URL);
    const json = await response.json();
    //ensures results returned have all of the information we need to render the page
    const books = json.items.filter(item => 
      item.volumeInfo.imageLinks 
      && item.volumeInfo.authors 
      && item.volumeInfo.title 
      && item.volumeInfo.industryIdentifiers 
      && item.volumeInfo.description);
    this.setState({ books: books });
    console.log(books);
    };

  //handles fetching more info about a book from Google Books API
  moreDetails = async isbn => {
    const deets = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}&maxResults=1`)
    const details = await deets.json();
    this.setState({ bookDetails: details.items[0] })
    //using isbn setState/console.log to help debugging
    this.setState({ currentISBN : isbn})
    console.log(details);
    console.log(isbn);
    //fetches page from Open Library API
    const libRes = await fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`);
    const openLibRes = await libRes.json();
    this.setState({ openLib: openLibRes });
    //only shows info if Open Library has a page for that item
    if (Object.keys(this.state.openLib).length > 0)
      this.setState({ didOpenLibRes: true });
    console.log(openLibRes);
    this.setState({ isInfoShowing: true });
  };

  //resets state on close; didOpenLibRes needs to be reset because not all books will return Open Lib pages
  handleClose = () => {
    this.setState({ isInfoShowing: false });
    this.setState({ didOpenLibRes: false });
  };

  //return statement for browse by title
  render() {  
    return (
        <div id="main-content">
          {/* isInfoShowing helps display either more book info or search list */}
          {this.state.isInfoShowing ? (
            <div className="book-card-detail">
            <img src={this.state.bookDetails.volumeInfo.imageLinks.thumbnail}
                alt={this.state.bookDetails.volumeInfo.title}/>
              <h3>{this.state.bookDetails.volumeInfo.title}</h3>
              {this.state.bookDetails.volumeInfo.authors.map
                (author => (<p>{author}</p>)
              )}
              <p>{this.state.bookDetails.volumeInfo.description}</p>
              <a className="faux-button" href={this.state.bookDetails.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">View in Google Books</a>
              {this.state.didOpenLibRes ? (
                <a className="faux-button" href={Object.values(this.state.openLib)[0].info_url} target="_blank" rel="noopener noreferrer">View in Open Library</a>) : (<></>)}
              <button onClick={this.handleClose}>Exit</button>
            </div>
          ) : (
            <div>
              {/* Search bt title form */}
              <form className="search-form" onSubmit={this.handleSubmit} >
                <input
                  type="search"
                  onChange={e => this.onSearchChange(e.target.value)}
                  name="search"
                  value={this.state.searchText}
                  placeholder="Look for books by title"
                />
                <button type="submit" id="submit" className="search-button">Search</button>
              </form>
              <div className="card-wrapper">
              {/* Item list returned from search */}
                <ul>
                    {this.state.books.map(book => (
                      <li
                        className="books-card"
                        key={book.etag}
                        onClick={() => this.moreDetails(book.volumeInfo.industryIdentifiers[1].identifier)}
                      >
                        <h3>{book.volumeInfo.title}</h3>
                        {book.volumeInfo.authors.map(author => (<p>{author}</p>))}
                        {/* line below with etag used for debugging */}
                        {/* <p>{book.etag}</p> */}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          )} 
          </div>


    );
  }
}
//TO DO

//set up catch if search yields no results

//add media quieries
  //vertical center align cards

//add notes