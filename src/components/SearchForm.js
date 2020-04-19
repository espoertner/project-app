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
        title: "",
        author: "",
        image: "",
        average_rating: ""
    },
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

  render() {  
    return (
      <div>
        <form className="search-form" onSubmit={this.handleSubmit} >
          <input
            type="search"
            onChange={e => this.onSearchChange(e.target.value)}
            name="search"
            value={this.state.searchText}
            placeholder="Type book title"
          />
          <button type="submit" id="submit" className="search-button">search</button>
        </form>

        <div>
        <ul>
            {this.state.books.items.map(book => (
              <li
                className="books-card"
                key={book.name}
              >
                {/* <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title}/> */}
                <h3>{book.volumeInfo.title}</h3>
                {book.volumeInfo.authors.map(author => (<p>{author}</p>))}
              </li>
            ))}
          </ul>

        </div>

      </div>      
    );
  }
}

//img thumbnail not working
//would like to truncate long titles
//need media quieries to display several on a line