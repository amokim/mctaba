const express = require('express');
const books = require('../data/book');
const { validateBook, validateBookPatch } = require('../middleware/validate');

const router = express.Router();

let nextId = Math.max(...books.map(b => b.id)) + 1;

const editableFields = ['title', 'author', 'isbn', 'price', 'category', 'inStock', 'coverImage'];

// pull only the allowed fields from the request body
const pickFields = (body) => {
    const fields = {};
    editableFields.forEach(field => {
        if (body[field] !== undefined) fields[field] = body[field];
    });
    if (typeof fields.title === 'string') fields.title = fields.title.trim();
    if (typeof fields.author === 'string') fields.author = fields.author.trim();
    if (typeof fields.category === 'string') fields.category = fields.category.trim().toLowerCase();
    return fields;
};

const isbnTaken = (isbn, excludeId) => books.some(b => b.isbn === isbn && b.id !== excludeId);

// readable sort names for the summary message
const sortLabels = {
    title: { asc: 'title (A to Z)', desc: 'title (Z to A)' },
    author: { asc: 'author (A to Z)', desc: 'author (Z to A)' },
    price: { asc: 'price (low to high)', desc: 'price (high to low)' },
    createdAt: { asc: 'date added (oldest first)', desc: 'date added (newest first)' }
};

// summary block that goes first on list responses, so every list shares one shape.
// message is for people reading the response, the other fields are for code.
const buildSummary = ({
    noun, nounPlural = `${noun}s`, total, start = 0, count = total,
    details = [], filters = {}, sort = null, sortLabel = null, paginated = false
}) => {
    let message;

    if (total === 0) {
        message = `No ${[`${nounPlural} found`, ...details].join(' ')}.`;
    } else {
        message = `Found ${total} ${[total === 1 ? noun : nounPlural, ...details].join(' ')}`;
        message += sortLabel ? `, sorted by ${sortLabel}.` : '.';

        if (paginated) {
            message += count > 0
                ? ` Showing ${start + 1}–${start + count} of ${total}.`
                : ` There are no ${nounPlural} on this page.`;
        }
    }

    return {
        message,
        matched: total,
        showing: count > 0 ? { from: start + 1, to: start + count, count } : { from: 0, to: 0, count: 0 },
        filters,
        sort
    };
};

// runs for every route with :id - validates the id and attaches the book
router.param('id', (req, res, next, value) => {
    const id = Number(value);

    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: `Book id must be a positive whole number, received '${value}'`
        });
    }

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: 'Not Found',
            message: `Book with id ${id} does not exist`
        });
    }

    req.bookIndex = index;
    req.book = books[index];
    next();
});

// GET /api/books - list books with filters, search, sorting and pagination
router.get('/', (req, res) => {
    let results = [...books];
    const { category, author, inStock, search } = req.query;
    let { sort, order = 'asc' } = req.query;

    // ?sort=price_desc is shorthand for ?sort=price&order=desc
    if (sort === 'price_desc') {
        sort = 'price';
        order = 'desc';
    }

    // what was applied, for the summary
    const filters = { category: null, author: null, inStock: null, search: null };
    const details = [];

    if (category) {
        results = results.filter(b => b.category === category.toLowerCase());
        filters.category = category.toLowerCase();
        details.push(`in ${filters.category}`);
    }

    if (author) {
        results = results.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
        filters.author = author;
        details.push(`by an author matching '${author}'`);
    }

    if (inStock !== undefined) {
        if (inStock !== 'true' && inStock !== 'false') {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'inStock can only be true or false'
            });
        }
        results = results.filter(b => String(b.inStock) === inStock);
        filters.inStock = inStock === 'true';
        details.push(filters.inStock ? 'in stock' : 'out of stock');
    }

    // search title and author (case-insensitive)
    if (search) {
        const term = search.toLowerCase();
        results = results.filter(b =>
            b.title.toLowerCase().includes(term) ||
            b.author.toLowerCase().includes(term)
        );
        filters.search = search;
        details.push(`matching '${search}'`);
    }

    if (sort) {
        const sortFields = ['title', 'author', 'price', 'createdAt'];

        if (!sortFields.includes(sort)) {
            return res.status(400).json({
                error: 'Bad Request',
                message: `sort can only be one of: ${sortFields.join(', ')}`
            });
        }

        if (order !== 'asc' && order !== 'desc') {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'order can only be asc or desc'
            });
        }

        results.sort((a, b) =>
            typeof a[sort] === 'number' ? a[sort] - b[sort] : a[sort].localeCompare(b[sort])
        );
        if (order === 'desc') results.reverse();
    }

    // pagination - defaults to page 1, limit 10
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'page and limit must be positive whole numbers'
        });
    }

    const total = results.length;
    const start = (page - 1) * limit;
    const pageBooks = results.slice(start, start + limit);

    res.json({
        summary: buildSummary({
            noun: 'book',
            total,
            start,
            count: pageBooks.length,
            details,
            filters,
            sort: sort ? { field: sort, order } : null,
            sortLabel: sort ? sortLabels[sort][order] : null,
            paginated: true
        }),
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        books: pageBooks
    });
});

// GET /api/books/stats - totals across the whole catalogue
// must stay above /:id, otherwise 'stats' is read as a book id
router.get('/stats', (req, res) => {
    const inStockCount = books.filter(b => b.inStock).length;
    const totalValue = books.reduce((sum, b) => sum + b.price, 0);
    const byPrice = [...books].sort((a, b) => a.price - b.price);
    const pick = (b) => (b ? { title: b.title, price: b.price } : null);

    // how many books in each category
    const categories = {};
    books.forEach(b => {
        categories[b.category] = (categories[b.category] || 0) + 1;
    });

    res.json({
        totalBooks: books.length,
        inStockCount,
        outOfStockCount: books.length - inStockCount,
        totalValue,
        averagePrice: books.length ? Math.round(totalValue / books.length) : 0,
        categories,
        mostExpensiveBook: pick(byPrice[byPrice.length - 1]),
        cheapestBook: pick(byPrice[0])
    });
});

// GET /api/books/:id - single book
router.get('/:id', (req, res) => {
    res.json(req.book);
});

// GET /api/books/:id/related - other books in the same category
router.get('/:id/related', (req, res) => {
    const related = books.filter(b => b.category === req.book.category && b.id !== req.book.id);

    res.json({
        summary: buildSummary({
            noun: 'related book',
            total: related.length,
            details: [`in ${req.book.category}`],
            filters: { category: req.book.category }
        }),
        book: { id: req.book.id, title: req.book.title, category: req.book.category },
        count: related.length,
        related
    });
});

// POST /api/books - create a book
router.post('/', validateBook, (req, res) => {
    const fields = pickFields(req.body);

    if (isbnTaken(fields.isbn)) {
        return res.status(409).json({
            error: 'Conflict',
            message: `A book with isbn ${fields.isbn} already exists`
        });
    }

    const book = {
        id: nextId++,
        title: fields.title,
        author: fields.author,
        isbn: fields.isbn,
        price: fields.price,
        category: fields.category,
        inStock: fields.inStock ?? true,
        coverImage: fields.coverImage ?? null,
        createdAt: new Date().toISOString()
    };

    books.push(book);
    res.status(201).json(book);
});

// PUT /api/books/:id - replace a book (all required fields must be sent)
router.put('/:id', validateBook, (req, res) => {
    const fields = pickFields(req.body);

    if (isbnTaken(fields.isbn, req.book.id)) {
        return res.status(409).json({
            error: 'Conflict',
            message: `A book with isbn ${fields.isbn} already exists`
        });
    }

    const updated = {
        id: req.book.id,
        title: fields.title,
        author: fields.author,
        isbn: fields.isbn,
        price: fields.price,
        category: fields.category,
        inStock: fields.inStock ?? true,
        coverImage: fields.coverImage ?? null,
        createdAt: req.book.createdAt
    };

    books[req.bookIndex] = updated;
    res.json(updated);
});

// PATCH /api/books/:id - update only the fields sent
router.patch('/:id', validateBookPatch, (req, res) => {
    const fields = pickFields(req.body);

    if (fields.isbn && isbnTaken(fields.isbn, req.book.id)) {
        return res.status(409).json({
            error: 'Conflict',
            message: `A book with isbn ${fields.isbn} already exists`
        });
    }

    const updated = { ...req.book, ...fields };

    books[req.bookIndex] = updated;
    res.json(updated);
});

// DELETE /api/books/:id - remove a book
router.delete('/:id', (req, res) => {
    const [deleted] = books.splice(req.bookIndex, 1);

    res.json({
        message: `Book '${deleted.title}' deleted`,
        book: deleted
    });
});

module.exports = router;
