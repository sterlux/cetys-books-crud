import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch("/api/books");
    const data = await response.json();
    setBooks(data);
  };

  const addBook = async (book) => {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    const newBook = await response.json();
    setBooks([...books, newBook]);
  };

  const deleteBook = async (id) => {
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    setBooks(books.filter((book) => book.id !== id));
  };

  const updateBook = async (book) => {
    const response = await fetch(`/api/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    const updatedBook = await response.json();
    setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
  };

  const selectBookToUpdate = (book) => {
    setSelectedBook(book);
  };

  const clearSelection = () => {
    setSelectedBook(null);
  };

  return (
    <div className="App">
      <h1>Book Library</h1>
      <BookForm
        addBook={addBook}
        selectedBook={selectedBook}
        updateBook={updateBook}
        clearSelection={clearSelection}
      />
      <BookList
        books={books}
        deleteBook={deleteBook}
        selectBookToUpdate={selectBookToUpdate}
      />
    </div>
  );
}

export default App;
