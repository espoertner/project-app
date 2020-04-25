# Book project app

## Project Summary
This project uses several book-focused APIs to let people search for books by title or subject. 

## Technical summary
Language/framework: JavaScript with React

API(s): Google Books, Archive.org/Open Library (Open Library API's are a subset of those found on Archive.org)

## Features
* Search for a book by title or subject

* Results are displayed with book title author name and book photo (if available)

* On click, a result will display the same information as well as a summary

* Users can view book's avalibility on Open Library

## Milestones
* Build title search function using Google's API

* Create styles for the home page and results with CSS

* Build subject search function using Open Library's API

* Enable 'on click' feature to display more information about a selected book

* Integrate Archive.org/Open Library API to display if book is available to borrow

* Integrate React Router

## Requirements to run the project
Google Book API requires a key. Acquire an API key by following Google's instructions [here](https://developers.google.com/books/docs/v1/getting_started). Save the API key in a .env file.

Running npm install in project-app directory.

Run npm start in project-app directory.