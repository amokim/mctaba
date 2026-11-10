import { useState } from 'react';
import { API_URL } from '../api';

const emptyForm = { title: '', author: '', isbn: '', genre: ''};

function AddBookForm({ onBookAdded }) {
    const [formData, setFormData] = useState(emptyForm);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // defining a single handler for each field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();

            if (response.ok) {
                // 201: result.data is the new saved book
                onBookAdded(result.data);
                setFormData(emptyForm);
            } else {
                // 400 (validation) or 409 duplicate isbn
                setError(result.error);
            }
        } catch (err) {
            setError(`Could not reach the API: ${err.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return(
        <form className="book-form" onSubmit={handleSubmit}>
            <label>
                Title
                <input name="title" value={formData.title} onChange={handleChange} />
            </label>

            <label>
                Author
                <input name="author" value={formData.author} onChange={handleChange}/>
            </label>

            <label>
                ISBN
                <input
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="978-0-00-000000-0"
                />
            </label>

            <label>
                Genre
                <select name="genre" value={formData.genre} onChange={handleChange}>
                    <option value="">-- Select a genre --</option>
                    <option value="fiction">Fiction</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                    <option value="autobiography">Autobiography</option>
                </select>
            </label>

            <button type="submit" disabled={submitting}>
                {submitting ? 'Adding...' : 'Add Book'}
            </button>

            {error && <p className="error">{error}</p>}
        </form>
    );
}

export default AddBookForm;

