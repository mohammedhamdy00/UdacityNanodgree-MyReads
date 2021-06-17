import React from "react";
import * as BooksAPI from "../../BooksAPI";
import "../../Assets/App.css";
import BookCard from "../../SharedComponents/BookCard";
import { Link } from "react-router-dom";

class SearchPage extends React.Component {
  state = {
    searchResults: [],
    noImg: "https://books.google.nl/googlebooks/images/no_cover_thumb.gif"
  };

  searchForBooks = async () => {
    const searchQuery = document.getElementById("search-query").value;
    const searchResults = await BooksAPI.search(searchQuery);
    this.setState({ searchResults });
    console.log(this.state.searchResults);
  };

  changeShelf = async (id) => {
    const newShelf = document.getElementById(id).value;
    console.log("newShelf", newShelf);
    console.log("get", await BooksAPI.get(id));
    await BooksAPI.update(id, newShelf);
  };
  render() {
    console.log(this.state.searchResults);
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                id="search-query"
                onChange={this.searchForBooks}
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.searchResults !== undefined &&
              this.state.searchResults.length > 0 ? (
                this.state.searchResults.map((book) => (
                  <li key={book.id}>
                    <BookCard
                      updateShelf={this.changeShelf}
                      id={book.id}
                      title={book.title}
                      author={book.authors}
                      imgURL={
                        book.imageLinks
                          ? book.imageLinks.smallThumbnail
                          : this.state.noImg
                      }
                    />
                  </li>
                ))
              ) : (
                <li>There's No Results</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
