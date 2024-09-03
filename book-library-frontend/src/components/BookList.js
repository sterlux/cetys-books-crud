import React from "react";

function BookList({ books, deleteBook, updateBook}) {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.title} by {book.author}
          <button onClick={() => deleteBook(book.id)}>Delete</button>
          <button onClick={() => updateBook(book.id)}>Update</button>
        </li>
      ))}
    </ul>
  );
}

export default BookList;
