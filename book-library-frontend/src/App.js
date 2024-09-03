import React, { useState, useEffect } from "react";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

function App() {
  const [books, setBooks] = useState([]);

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

  const updateBook = async (id) => {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    const popup = document.createElement('div');
    popup.className = 'popup';

    const title = document.createElement('h2');
    title.textContent = 'Modificar un libro';

    const content = document.createElement('div');

    const tituloLabel = document.createElement('label');
    tituloLabel.textContent = 'Título:';
    const tituloInput = document.createElement('input');
    tituloInput.type = 'text';

    const autorLabel = document.createElement('label');
    autorLabel.textContent = 'Autor:';
    const autorInput = document.createElement('input');
    autorInput.type = 'text';

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
      updateBtn.onclick = function() {
        const updatedBook = {
            title: tituloInput.value,
            author: autorInput.value
        };

        fetch(`/api/books/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBook)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update the book");
            }
            return response.json();
        })
        .then(data => {
          setBooks(books.map(book => (book.id === id ? data : book)));
          console.log("Book updated successfully:", data);
        })
        .catch(error => {
            console.error("Error updating the book:", error);
        });

        document.body.removeChild(popup);
        document.body.removeChild(overlay);
    };

    // Agregar los elementos al contenido del pop-up
    content.appendChild(tituloLabel);
    content.appendChild(tituloInput);
    content.appendChild(document.createElement('br')); // Salto de línea
    content.appendChild(autorLabel);
    content.appendChild(autorInput);

    // Agregar el contenido y el botón de cierre al pop-up
    popup.appendChild(title);
    popup.appendChild(content);
    popup.appendChild(updateBtn);

    // Agregar el pop-up y el overlay al cuerpo del documento
    document.body.appendChild(overlay);
    document.body.appendChild(popup);

    // Mostrar el pop-up y el overlay
    popup.style.display = 'block';
    overlay.style.display = 'block';
  };

  return (
    <div className="App">
      <h1>Book Library</h1>
      <BookForm addBook={addBook} />
      <BookList books={books} deleteBook={deleteBook} updateBook={updateBook} />
    </div>
  );
}

export default App;
