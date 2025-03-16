import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch books from Google Books API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (query) => {
  // Note: We're using the API without a key which is fine for basic usage
  const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`);
  return response.data.items || [];
});

// Load reading list from localStorage if available
const loadReadingList = () => {
  try {
    const savedList = localStorage.getItem('readingList');
    return savedList ? JSON.parse(savedList) : [];
  } catch (error) {
    console.error('Error loading reading list from localStorage:', error);
    return [];
  }
};

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    readingList: loadReadingList(),
    status: 'idle',
    error: null,
  },
  reducers: {
    addToReadingList: (state, action) => {
      // Check if book is already in reading list to avoid duplicates
      const bookExists = state.readingList.some(
        (book) => book.id === action.payload.id
      );
      if (!bookExists) {
        state.readingList.push(action.payload);
        localStorage.setItem('readingList', JSON.stringify(state.readingList));
      }
    },
    removeFromReadingList: (state, action) => {
      state.readingList = state.readingList.filter((book) => book.id !== action.payload);
      localStorage.setItem('readingList', JSON.stringify(state.readingList));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToReadingList, removeFromReadingList } = bookSlice.actions;
export default bookSlice.reducer;