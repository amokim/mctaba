import { useState, useEffect } from "react";
import { API_URL } from "./api";
import BookCard from "./components/BookCard";
import AddBookForm from "./components/AddBookForm";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import ConfirmDialog from "./components/ConfirmDialog";
import './App.css';

// choose the starting theme: saved choice first, otherwise follow the OS setting
const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // localStorage can be blocked (e.g. private browsing) - fall back to the OS setting
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function App() {
  // defining states
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState(getInitialTheme);
  const [bookToDelete, setBookToDelete] = useState(null);

  // put the theme on <html data-theme="..."> so the CSS variables switch, and remember it
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // saving failed - the theme still works for this visit
    }
  }, [theme]);

  useEffect(() => {
    const query = search.trim();
    const url = query 
      ? `${API_URL}?search=${encodeURIComponent(query)}&limit=100`
      : `${API_URL}?limit=100`;

    // AbortController to cancel request already in flight
    const controller = new AbortController();

    // delay mechanism: wait 300ms while typing
    const delay = query ? 300 : 0;

    const timerId = setTimeout(() => {
      setLoading(true);
      setError(null);

      fetch(url, { signal: controller.signal })
        .then(async (res) => {
          const result = await res.json();
          if (!res.ok) throw new Error(result.error);
          return result.data;
        })
        .then((data) => setBooks(data))
        .catch((err) => {
          if (err.name === 'AbortError') return;
          setError(`Could not load books. Is the API running on port 3000?(${err.message})`);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, delay);
    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [search]);

  useEffect(() => {
    if (!toast) return;
    const timerId = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timerId);
  }, [toast]);

  const handleBookAdded = (newBook) => {
    // add to the END of the current list
    setBooks((prev) => [...prev, newBook]);
    setToast({ type: 'success', message: `"${newBook.title}" was added` });
  };

  // Delete button clicked: just open the confirmation dialog
  const handleDelete = (book) => {
    setBookToDelete(book);
  };

  // optimistic delete: remove from the UI first, put it back if the API refuses
  const confirmDelete = async () => {
    const book = bookToDelete;
    setBookToDelete(null); // close the dialog

    // remember the list as it is now, in case we have to undo
    const previousBooks = books;

    // remove it from the screen right away
    setBooks((prev) => prev.filter((b) => b.id !== book.id));

    try {
      const res = await fetch(`${API_URL}/${book.id}`, { method: 'DELETE' });
      const result = await res.json();

      // e.g. 400 "Cannot delete a book that is currently borrowed"
      if (!res.ok) throw new Error(result.error);

      setToast({ type: 'success', message: `"${book.title}" was deleted` });
    } catch (err) {
      // rollback: the server said no (or is down), so put the list back
      setBooks(previousBooks);
      setToast({ type: 'error', message: err.message });
    }
  };

  // flip between light and dark
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app">
      {/* header with title + theme toggle */}
      <header className="app-header">
        <div>
          <h1>Library Books</h1>
          <p className="subtitle">Browse, search and add books to the collection</p>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      {toast && (
        <div className={`toast ${toast.type}`} role="status">
          {toast.message}
        </div>
      )}

      <ConfirmDialog
        open={bookToDelete !== null}
        title="Delete book?"
        message={`Are you sure you want to delete "${bookToDelete?.title}"? This can't be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setBookToDelete(null)}
      />

      {/* two-column layout: form panel left, books right */}
      <main className="layout">
        <aside className="panel form-panel">
          <h2>Add a Book</h2>
          <AddBookForm onBookAdded={handleBookAdded} />
        </aside>

        <section className="books-section">
          <div className="books-header">
            <h2>Books</h2>
            {!loading && !error && <span className="count">{books.length}</span>}
          </div>

          <SearchBar value={search} onChange={setSearch} />

          {loading && <div className="spinner" aria-label="loading books" />}

          {!loading && error && <p className="error">{error}</p>}

          {!loading && !error && books.length === 0 && (
            <p className="empty">No books found</p>
          )}

          {!loading && !error && books.length > 0 && (
            <ul className="book-grid">
              {books.map((book) => (
                <BookCard key={book.id} book={book} onDelete={handleDelete} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

