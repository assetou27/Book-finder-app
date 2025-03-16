import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BookSearch from './components/BookSearch';
import ReadingList from './components/ReadingList';

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <nav className="main-nav">
          <Link to="/" className="nav-link">📚 Search Books</Link>
          <Link to="/reading-list" className="nav-link">📖 My Reading List</Link>
        </nav>
      </header>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<BookSearch />} />
          <Route path="/reading-list" element={<ReadingList />} />
        </Routes>
      </main>
      
      <footer className="app-footer">
        <p>Created with React & Redux Toolkit</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
