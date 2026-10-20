const express = require('express');


const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());

let books = [
  { id: 1, title: "Weep Not, Child", author: "Ngugi wa Thiong'o", isbn: "978-0-14-018650-2", genre: "fiction", available: true, borrowedBy: null },
  { id: 2, title: "The River Between", author: "Ngugi wa Thiong'o", isbn: "978-0-14-018651-9", genre: "fiction", available: false, borrowedBy: "Amina Wanjiku" },
  { id: 3, title: "Born a Crime", author: "Trevor Noah", isbn: "978-0-399-59043-2", genre: "autobiography", available: true, borrowedBy: null },
  { id: 4, title: "Americanah", author: "Chimamanda Ngozi Adichie", isbn: "978-0-307-45592-8", genre: "fiction", available: true, borrowedBy: null },
  { id: 5, title: "The Lean Startup", author: "Eric Ries", isbn: "978-0-307-88789-4", genre: "business", available: false, borrowedBy: "Brian Ochieng" },
  { id: 6, title: "Clean Code", author: "Robert C. Martin", isbn: "978-0-13-235088-4", genre: "technology", available: true, borrowedBy: null },
  { id: 7, title: "Dust", author: "Yvonne Adhiambo Owuor", isbn: "978-1-78470-045-2", genre: "fiction", available: true, borrowedBy: null },
  { id: 8, title: "Half of a Yellow Sun", author: "Chimamanda Ngozi Adichie", isbn: "978-1-4000-9520-3", genre: "fiction", available: true, borrowedBy: null }
];

let nextId = Math.max(...books.map(b => b.id)) + 1;

// basic isbn check: only digits and dashes, must have both, at least 10 characters
const isValidIsbn = (isbn) => /^(?=.*\d)(?=.*-)[\d-]{10,}$/.test(isbn);

// Default route
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Books API",
        version: "1.0.0",
        endpoints: {
            listBooks: "GET /api/books?genre=&available=&search=&sort=title|author&order=asc|desc&page=&limit=",
            getBook: "GET /api/books/:id",
            createBook: "POST /api/books",
            updateBook: "PUT /api/books/:id",
            deleteBook: "DELETE /api/books/:id",
            borrowBook: "POST /api/books/:id/borrow",
            returnBook: "POST /api/books/:id/return"
        }
    })
})

// GET /api/books - fetches all books
app.get('/api/books', (req, res) => {
    let bookResults = [...books];

    // filter by genre option
    if (req.query.genre) {
        const genre = req.query.genre.toLowerCase();
        bookResults = bookResults.filter(b => b.genre.toLowerCase() === genre);
        
        if (bookResults.length === 0) {
            return res.status(404).json({
                success: false,
                error: `No books found in ${genre} genre`
            })
        }
    }

    // filter by availability
    if (req.query.available) {
        const available = req.query.available.toLowerCase();

        if (available !== 'true' && available !== 'false') {
              return res.status(400).json({
                  success: false,
                  error: 'Available filter can be set as true or false only.'
              })
        }

        bookResults = bookResults.filter(b => String(b.available).toLowerCase() === available);
    }

    // search by title and author (case-insensitive)
    if (req.query.search) {
        const search = req.query.search.toLowerCase();
        bookResults = bookResults.filter(b =>
            b.title.toLowerCase().includes(search) ||
            b.author.toLowerCase().includes(search)
        );

        if (bookResults.length === 0) {
            return res.status(404).json({
                success: false,
                error: `No books match '${req.query.search}'`
            })
        }

    }

    // sort by title or author, order as asc or desc
    if (req.query.sort) {
        const sort = req.query.sort.toLowerCase();
        const order = (req.query.order || 'asc').toLowerCase();

        if (sort !== 'title' && sort !== 'author') {
            return res.status(400).json({
                success: false,
                error: 'Sort can be set as title or author only.'
            })
        }

        if (order !== 'asc' && order !== 'desc') {
            return res.status(400).json({
                success: false,
                error: 'Order can be set as asc or desc only.'
            })
        }

        bookResults.sort((a, b) => a[sort].localeCompare(b[sort]));
        if (order === 'desc') bookResults.reverse();
    }

    // pagination
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
        return res.status(400).json({
            success: false,
            error: 'Page and limit must be positive whole numbers.'
        })
    }

    const total = bookResults.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedResults = bookResults.slice(start, start + limit);

    res.json({
        success: true,
        count: paginatedResults.length,
        data: paginatedResults,
        pagination: {
            page,
            limit,
            total,
            totalPages
        }
    })
})

// Fetch a single book with their id
app.get('/api/books/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            success: false,
            error: `'${req.params.id}' is not a valid book id. Use a number.`
        })
    }

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            error: `No book with id of ${id}.`
        })
    }
    res.json({
        success: true,
        data: book
    });
})

// POST /api/books - create a new book. Required fields: title, author, isbn, genre. Default available: true, borrowedBy: null
app.post('/api/books', (req, res) => {
    const { title, author, isbn, genre } = req.body ?? {};

    // validation checks
    const required = { title, author, isbn, genre };
    const missing = Object.keys(required).filter(
        key => typeof required[key] !== 'string' || !required[key].trim()
    );

    if (missing.length > 0) {
        return res.status(400).json({
            success: false,
            error: `Missing or invalid fields: ${missing.join(', ')}`
        })
    }

    if (!isValidIsbn(isbn.trim())) {
        return res.status(400).json({
            success: false,
            error: 'Invalid isbn. Use digits and dashes, at least 10 characters.'
        })
    }

    if (books.some(b => b.isbn === isbn.trim())) {
        return res.status(409).json({
            success: false,
            error: `A book with isbn ${isbn.trim()} already exists`
        })

    }

    const newBook = {
        id: nextId++,
        title: title.trim(),
        author: author.trim(),
        isbn: isbn.trim(),
        genre: genre.trim().toLowerCase(),
        available: true,
        borrowedBy: null
    }

    books.push(newBook);

    res.status(201).json({
        success: true,
        data: newBook
    })
})

// PUT /api/books/:id - full update. Required fields: title, author, isbn, genre, available, borrowedBy
app.put('/api/books/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            success: false,
            error: `'${req.params.id}' is not a valid book id. Use a number.`
        })
    }

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: `No book with id of ${id}.`
        })
    }

    const { title, author, isbn, genre, available, borrowedBy } = req.body ?? {};

    // validation checks
    const required = { title, author, isbn, genre };
    const missing = Object.keys(required).filter(
        key => typeof required[key] !== 'string' || !required[key].trim()
    );

    if (typeof available !== 'boolean') missing.push('available');
    if (borrowedBy === undefined) missing.push('borrowedBy');

    if (missing.length > 0) {
        return res.status(400).json({
            success: false,
            error: `Missing or invalid fields: ${missing.join(', ')}`
        })
    }

    if (!isValidIsbn(isbn.trim())) {
        return res.status(400).json({
            success: false,
            error: 'Invalid isbn. Use digits and dashes, at least 10 characters.'
        })
    }

    // available books have no borrower, borrowed books must have one
    if (available && borrowedBy !== null) {
        return res.status(400).json({
            success: false,
            error: 'borrowedBy must be null when the book is available'
        })
    }

    if (!available && (typeof borrowedBy !== 'string' || !borrowedBy.trim())) {
        return res.status(400).json({
            success: false,
            error: 'borrowedBy is required when the book is not available'
        })
    }

    if (books.some(b => b.isbn === isbn.trim() && b.id !== id)) {
        return res.status(409).json({
            success: false,
            error: `A book with isbn ${isbn.trim()} already exists`
        })
    }

    const updatedBook = {
        id,
        title: title.trim(),
        author: author.trim(),
        isbn: isbn.trim(),
        genre: genre.trim().toLowerCase(),
        available,
        borrowedBy: available ? null : borrowedBy.trim()
    }

    books[index] = updatedBook;

    res.json({
        success: true,
        data: updatedBook
    })
})

// DELETE /api/books/:id - remove a book. Borrowed books cannot be deleted
app.delete('/api/books/:id', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            success: false,
            error: `'${req.params.id}' is not a valid book id. Use a number.`
        })
    }

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: `No book with id of ${id}.`
        })
    }

    if (!books[index].available) {
        return res.status(400).json({
            success: false,
            error: 'Cannot delete a book that is currently borrowed'
        })
    }

    const [deletedBook] = books.splice(index, 1);

    res.status(200).json({
        success: true,
        data: deletedBook
    })
})

// POST /api/books/:id/borrow — borrow a book
app.post('/api/books/:id/borrow', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            success: false,
            error: `'${req.params.id}' is not a valid book id. Use a number.`
        })
    }

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            error: `No book found with id of ${id}.`
        })
    }

    if (!book.available) {
        return res.status(400).json({
            success: false,
            error: `Book is already borrowed by ${book.borrowedBy}`
        })
    }

    const { borrower } = req.body ?? {};

    if (typeof borrower !== 'string' || !borrower.trim()) {
        return res.status(400).json({
            success: false,
            error: 'Missing or invalid fields: borrower'
        })
    }

    book.available = false;
    book.borrowedBy = borrower.trim();

    res.status(200).json({
        success: true,
        data: book
    })
})

// POST /api/books/:id/return - return a borrowed book
app.post('/api/books/:id/return', (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            success: false,
            error: `'${req.params.id}' is not a valid book id. Use a number.`
        })
    }

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            error: `No book with id of ${id}.`
        })
    }

    if (book.available) {
        return res.status(400).json({
            success: false,
            error: 'Book is not currently borrowed'
        })
    }

    book.available = true;
    book.borrowedBy = null;

    res.status(200).json({
        success: true,
        data: book
    })
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});