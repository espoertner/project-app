# Book project app

## Project Summary
This project uses several book-focused APIs to let people search for books by title, author or subject. 

## Technical summary
Language/framework: JavaScript with React

API(s): Google Books, Archive.org/Open Library (Open Library API's are a subset of those found on Archive.org)

## Features
* Search for a book by title, author or subject

* Results are displayed with book title and author name

* On click, a result will display book image, title, author name, and a summary

* Users can view book on Google Books or Open Library (if available for the selected title)

## Milestones
* Build title search function using Google's API

* Create styles for the home page and results with CSS

* Build subject and author search function using Google Book's API

* Enable 'on click' feature to display more information about a selected book

* Integrate Archive.org/Open Library API to display if book is available to borrow

* Integrate React Router

## Requirements to run the project
Google Book API requires a key. Acquire an API key by following Google's instructions [here](https://developers.google.com/books/docs/v1/getting_started). Create a .env file in the project folder and save the key as such: 
REACT_APP_GOOGLE_API_KEY=YourKeyHere

Running npm install in project-app directory.

Run npm start in project-app directory.