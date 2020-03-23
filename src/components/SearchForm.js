import React, { Component } from 'react';
import '../App.css';

const apiKey = process.env.REACT_APP_GOODREADS_API_KEY;

export default class SearchForm extends Component {
  
  state = {
    searchText: '',
    books: {
        results: []
      },
    bookDetails: {
        title: "",
        author: "",
        image: "",
        average_rating: ""
    },
  }
  
  onSearchChange = e => {
    this.setState({ searchText: e.target.value });
    this.fetchBooks();
  }

  fetchBooks = async ( 
    searchText = this.state.searchText,
    URL =
    `https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${searchText}`
) => {
    const response = await fetch(URL);
    const books = await response.json();
    this.setState({ books: books });
    console.log(books);
    };
  
  handleSubmit = e => {
    e.preventDefault();
    e.currentTarget.reset();
  }
  
  render() {  
    return (
      <form className="search-form" onSubmit={this.handleSubmit} >
        <input type="search" 
               onChange={this.onSearchChange}
               name="search" 
               placeholder="Type author or title" />
        <button type="submit" id="submit" className="search-button">search</button>
      </form>      
    );
  }
}