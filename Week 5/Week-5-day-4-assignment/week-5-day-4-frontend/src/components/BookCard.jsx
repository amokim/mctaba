function BookCard({ book, onDelete }) {
    return (
        <li className="book-card">
            <h3>{book.title}</h3>
            <p className="author">by {book.author}</p>
            <p className="genre">{book.genre}</p>

            {/* available is true/false in the API, so pick one badge or the other */}
            {book.available ? (
                <span className="badge available">Available</span>
            ) : (
                <span className="badge borrowed">Borrowed by {book.borrowedBy}</span>
            )}

            {/* arrow function so onDelete runs on click, not during render */}
            <button type="button" className="delete-btn" onClick={() => onDelete(book)}>
                Delete
            </button>
        </li>
    );
}

export default BookCard;