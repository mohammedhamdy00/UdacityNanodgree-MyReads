import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import BookCard from '../../SharedComponents/BookCard'
import '../../Assets/App.css'

class HomePage extends React.Component {
  state = {
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    readBooks: [],
  }

  componentDidMount() {
    const userBooks = async () => {
      const books = await BooksAPI.getAll();
      const currentlyReadingBooks = books.filter((book) => book.shelf === "currentlyReading")
      const readBooks = books.filter((book) => book.shelf === "read")
      const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead")
      this.setState({ currentlyReadingBooks, readBooks, wantToReadBooks })
    };
    userBooks();
  }
  userBooks = async () => {
    const books = await BooksAPI.getAll();
    const currentlyReadingBooks = books.filter((book) => book.shelf === "currentlyReading")
    const readBooks = books.filter((book) => book.shelf === "read")
    const wantToReadBooks = books.filter((book) => book.shelf === "wantToRead")
    this.setState({ currentlyReadingBooks, readBooks, wantToReadBooks })
  };
  changeShelf = async (id) => {
    const newShelf = document.getElementById(id).value;
    await BooksAPI.update(id, newShelf);
    await this.userBooks();
  }
  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.currentlyReadingBooks.map((book) => (
                      <li key={book.id}>
                        <BookCard updateShelf={this.changeShelf} id={book.id} title={book.title} author={book.authors} imgURL={book.imageLinks.smallThumbnail != undefined ? book.imageLinks.smallThumbnail : 'https://books.google.nl/googlebooks/images/no_cover_thumb.gif'} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.wantToReadBooks.map((book) => (
                      <li key={book.id}>
                        <BookCard updateShelf={this.changeShelf} id={book.id} title={book.title} author={book.authors} imgURL={book.imageLinks.smallThumbnail != undefined ? book.imageLinks.smallThumbnail : 'https://books.google.nl/googlebooks/images/no_cover_thumb.gif'} />
                      </li>))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {this.state.readBooks.map((book) => (
                      <li key={book.id}>
                        <BookCard updateShelf={this.changeShelf} id={book.id} title={book.title} author={book.authors} imgURL={book.imageLinks.smallThumbnail != undefined ? book.imageLinks.smallThumbnail : 'https://books.google.nl/googlebooks/images/no_cover_thumb.gif'} />
                      </li>))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search"><button>Add a book</button></Link>
          </div>
        </div>

      </div>
    )
  }
}

export default HomePage
