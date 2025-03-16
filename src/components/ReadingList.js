import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromReadingList } from '../redux/slices/bookSlice';

const ReadingList = () => {
  const dispatch = useDispatch();
  const { readingList } = useSelector((state) => state.books);

  return (
    <div className="container">
      <h1 className="page-title">
        <span role="img" aria-label="Reading List">📖</span> My Reading List
      </h1>
      
      {readingList.length === 0 ? (
        <div className="empty-list">
          <p>Your reading list is empty.</p>
          <p>Search for books and add them to your list!</p>
        </div>
      ) : (
        <div className="book-grid">
          {readingList.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">
                {book.thumbnail ? (
                  <img src={book.thumbnail} alt={book.title} />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
              </div>
              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-authors">{book.authors?.join(', ')}</p>
                {book.publisher && <p className="book-publisher">Publisher: {book.publisher}</p>}
                <button 
                  onClick={() => dispatch(removeFromReadingList(book.id))}
                  className="remove-button"
                >
                  Remove from List
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReadingList;
