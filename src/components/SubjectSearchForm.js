import React, { Component } from 'react';
import '../App.css';

export default class SubjectSearchForm extends Component {
    state = {
        searchSubjectText: '',
        booksSubject: {
          works: []
        },
        openLibSub: {
        },
        currentISBN: {
        },
        isInfoShowing: false,
    }

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

    moreSubjectDetails = async openID => {
        const opLibRes = await fetch(`http://openlibrary.org/api/books?bibkeys=olid:${openID}&jscmd=details&format=json`);
        const openLibJson = await opLibRes.json();
        this.setState({ openLibSub: openLibJson });
        console.log(openLibJson);
        this.setState({ isInfoShowing: true });
    };
    
    handleClose = () => {
        this.setState({ isInfoShowing: false });
    };

    render() {
        return(
        <div>
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
            {this.state.booksSubject.works.map(bookSub => (
                <li
                className="books-card"
                key={bookSub.key}
                onClick={() => this.moreSubjectDetails(bookSub.lending_edition)}
                >
                <h3>{bookSub.title}</h3>
                <p>{bookSub.authors[0].name}</p>
                </li>
            ))}
            </ul>
          )}
        </div>
        
        </div>
        )
    }
}