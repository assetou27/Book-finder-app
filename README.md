📚 Book Finder Application
A React web application that allows users to search for books using the Google Books API and save them to a personal reading list.
🔍 Features

Search for books by title, author, or keywords
View book details including cover images, authors, and publication dates
Add books to a personal reading list
Remove books from the reading list
Persistent storage of the reading list using localStorage

🛠️ Technologies Used

React - Frontend UI library for building the user interface
Redux Toolkit - State management solution for React applications
React Router - Handling navigation between different components
Axios - Making API requests to the Google Books API
LocalStorage API - Persisting reading list data between sessions
CSS3 - Custom styling with modern CSS features
Google Books API - External data source for book information

💡 Approach Taken
Planning and Design

Identified the core functionality needed for a book search application
Designed the application structure with reusable components
Created a simple and intuitive user interface

Development Process

Set up the basic React application structure
Integrated Redux Toolkit for state management
Implemented the Google Books API integration using Axios
Created the BookSearch component for searching and displaying results
Built the ReadingList component for saved books
Added localStorage persistence for the reading list
Implemented navigation using React Router
Enhanced the UI with responsive design and visual feedback

Challenges

Handling API response data structure from Google Books
Managing state updates when adding books to the reading list
Implementing proper error handling for API requests
Creating a responsive design for various screen sizes

📋 Usage Instructions

Search for Books

Enter your search query in the search bar
Click "Search" or press Enter to find books
Browse through the search results


Add to Reading List

Click "Add to Reading List" on any book card
Visual feedback will confirm the book has been added
Rating is also possible in this application


View Reading List

Click on "My Reading List" in the navigation bar
View all books you've saved to your reading list


Remove from Reading List

Click "Remove" on any book in your reading list to delete it



🔗 Live Site
View the live application <!-- Add your deployed site URL when available -->
🧪 Future Improvements

Add book categories and filtering options
Implement user authentication for personalized reading lists
Add a "Read Now" feature linking to online reading options
Create a more detailed book view page
Add book ratings and reviews
Implement dark mode toggle