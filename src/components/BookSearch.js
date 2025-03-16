import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks, addToReadingList } from '../redux/slices/bookSlice';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [addedBooks, setAddedBooks] = useState({});
  const dispatch = useDispatch();
  const { books, status } = useSelector((state) => state.books);

  const handleSearch = () => {
    if (query) dispatch(fetchBooks(query));
  };

  const handleAddToReadingList = (book) => {
    dispatch(addToReadingList(book));

    // Set this book as "added" to show feedback
    setAddedBooks(prev => ({
      ...prev,
      [book.id]: true
    }));

    // Reset the "added" status after 2 seconds
    setTimeout(() => {
      setAddedBooks(prev => ({
        ...prev,
        [book.id]: false
      }));
    }, 2000);
  };

  return (
    <div className="container">
      <h1 className="page-title">📚 Book Finder</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {status === 'loading' && <div className="loading">Loading books...</div>}
      {status === 'failed' && <div className="error">Error fetching books.</div>}

      <div className="book-grid">
        {books && books.map((book) => {
          // Prepare book data
          const { id } = book;
          const { 
            title, 
            authors = ['Unknown Author'], 
            description, 
            imageLinks,
            publishedDate,
            publisher
          } = book.volumeInfo;
          
          // Create structured book object for reading list
          const bookForList = {
            id,
            title,
            authors,
            description: description?.substring(0, 150) + (description?.length > 150 ? '...' : ''),
            thumbnail: imageLinks?.thumbnail,
            publishedDate,
            publisher
          };
          
          const isAdded = addedBooks[id];
          
          return (
            <div key={id} className="book-card">
              <div className="book-image">
                {imageLinks?.thumbnail ? (
                  <img src={imageLinks.thumbnail} alt={title} />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
              </div>
              <div className="book-details">
                <h3 className="book-title">{title}</h3>
                <p className="book-authors">{authors?.join(', ')}</p>
                {publishedDate && <p className="book-date">Published: {publishedDate}</p>}
                <button 
                  onClick={() => handleAddToReadingList(bookForList)}
                  className={`add-button ${isAdded ? 'added' : ''}`}
                  disabled={isAdded}
                >
                  {isAdded ? '✓ Added to List' : 'Add to Reading List'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {books && books.length === 0 && status === 'succeeded' && (
        <div className="no-results">No books found. Try a different search.</div>
      )}
    </div>
  );
};

export default BookSearch;
