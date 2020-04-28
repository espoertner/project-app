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
  
  fetchBooks = async ( 
    searchText = this.state.searchText,
    URL = `https://www.googleapis.com/books/v1/volumes?q=${searchText}&key=${apiKey}&maxResults=20`
) => {
    const response = await fetch(URL);
    const books = await response.json();
    //const filteredBooks = books.filter(book => book.item.volumeInfo.imageLinks.thumbnail)
    this.setState({ books: books });
    console.log(books);
    };

  moreDetails = async isbn => {
    const deets = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${apiKey}&maxResults=1`)
    const details = await deets.json();
    this.setState({ bookDetails: details })
    this.setState({ currentISBN : isbn})
    console.log(details);
    console.log(isbn);
    const libRes = await fetch(`http://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`);
    const openLibRes = await libRes.json();
    this.setState({ openLib: openLibRes });
    if (Object.keys(this.state.openLib).length > 0)
      this.setState({ didOpenLibRes: true })
    console.log(openLibRes);
    this.setState({ isInfoShowing: true });
  };


  handleClose = () => {
    this.setState({ isInfoShowing: false });
    this.setState({ didOpenLibRes: false });
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
              <img src={this.state.bookDetails.items[0].volumeInfo.imageLinks.thumbnail} 
                alt={this.state.bookDetails.items[0].volumeInfo.title}/>
              <h3>{this.state.bookDetails.items[0].volumeInfo.title}</h3>
              {this.state.bookDetails.items[0].volumeInfo.authors.map(author => (<p>{author}</p>))}
              <p>{this.state.bookDetails.items[0].volumeInfo.description}</p>
              <a className="faux-button" href={this.state.bookDetails.items[0].volumeInfo.previewLink}>View in Google Books</a>
              {this.state.didOpenLibRes ? (
                <a className="faux-button" href={this.state.bookDetails.items[0].volumeInfo.previewLink}>View in Open Library</a>) : (<></>)}
              <button onClick={this.handleClose}>Exit</button>
            </div>
          ) : (
            <ul>
                {this.state.books.items.map(book => (
                  <li
                    className="books-card"
                    key={book.etag}
                    onClick={() => this.moreDetails(book.volumeInfo.industryIdentifiers[1].identifier)}
                  >
                    {/* <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/> */}
                    <h3>{book.volumeInfo.title}</h3>
                    {book.volumeInfo.authors.map(author => (<p>{author}</p>))}
                    {/* <p>{book.etag}</p> */}
                  </li>
                ))}
              </ul>
          )} 
          </div>

      </div>   

    );
  }
}

//img thumbnail not working -- if book doesn't have image, thows error for whole page -- can't get && working
//would like to show "View in Open Library" only if they have page for it
//open library returns json named with ISBN -- how to access state? this.state.openLib[0].info_url
//some google results don't have an isbn?!?!
//break up title and subject onto different "pages"
//catch if search yields no results
//need media quieries to display several on a line