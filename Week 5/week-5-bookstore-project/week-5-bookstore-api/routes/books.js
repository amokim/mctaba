const express = require('express');
const books = require('../data/books');
const categories = require('../data/categories');
const { validateBook } = require('../middleware/validate');
const requireAdmin = require('../middleware/requireAdmin');
const { HttpError, slugify } = require('../utils/helpers');

const router = express.Router();

let nextId = Math.max(...books.map(b => b.id)) + 1;

const SORT_FIELDS = ['title', 'author', 'price', 'createdAt'];
const MAX_LIMIT = 50;

const isbnTaken = (isbn, excludeId) => {
    const clean = isbn.replace(/-/g, '');
    return books.some(b => b.isbn.replace(/-/g, '') === clean && b.id !== excludeId);
};

// runs for every route with :id - validates the id and attaches the book
router.param('id', (req, res, next, value) => {
    const id = Number(value);

    if (!Number.isInteger(id) || id < 1) {
        throw new HttpError(400, 'Bad Request', `Book id must be a positive whole number, received '${value}'`);
    }

    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        throw new HttpError(404, 'Not Found', `Book with id ${id} does not exist`);
    }

    req.bookIndex = index;
    req.book = books[index];
    next();
});

// GET /api/books - ?search, ?category, ?inStock, ?sort, ?order, ?page, ?limit
router.get('/', (req, res) => {
    let results = [...books];
    const { search, category, inStock, sort, order = 'asc' } = req.query;

    if (category) {
        const match = categories.find(c => c.id === slugify(category));

        if (!match) {
            throw new HttpError(400, 'Bad Request',
                `Unknown category '${category}'. Use one of: ${categories.map(c => c.id).join(', ')}`);
        }
        results = results.filter(b => b.category === match.name);
    }

    // search title and author (case-insensitive)
    if (search && search.trim()) {
        const term = search.trim().toLowerCase();
        results = results.filter(b =>
            b.title.toLowerCase().includes(term) ||
            b.author.toLowerCase().includes(term)
        );
    }

    if (inStock !== undefined) {
        if (inStock !== 'true' && inStock !== 'false') {
            throw new HttpError(400, 'Bad Request', 'inStock can only be true or false');
        }
        results = results.filter(b => String(b.inStock) === inStock);
    }

    if (sort) {
        if (!SORT_FIELDS.includes(sort)) {
            throw new HttpError(400, 'Bad Request', `sort can only be one of: ${SORT_FIELDS.join(', ')}`);
        }
        if (order !== 'asc' && order !== 'desc') {
            throw new HttpError(400, 'Bad Request', 'order can only be asc or desc');
        }

        results.sort((a, b) =>
            typeof a[sort] === 'number' ? a[sort] - b[sort] : a[sort].localeCompare(b[sort])
        );
        if (order === 'desc') results.reverse();
    }

    // pagination - defaults to page 1, limit 10
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT) {
        throw new HttpError(400, 'Bad Request',
            `page must be a positive whole number and limit a whole number from 1 to ${MAX_LIMIT}`);
    }

    const total = results.length;
    const start = (page - 1) * limit;

    res.json({
        data: results.slice(start, start + limit),
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    });
});

// GET /api/books/:id - single book
router.get('/:id', (req, res) => {
    res.json({ data: req.book });
});

// POST /api/books - create a book (admin only)
router.post('/', requireAdmin, validateBook, (req, res) => {
    const fields = req.validatedBook;

    if (isbnTaken(fields.isbn)) {
        throw new HttpError(409, 'Conflict', `A book with isbn ${fields.isbn} already exists`);
    }

    const book = {
        id: nextId++,
        ...fields,
        createdAt: new Date().toISOString()
    };

    books.push(book);
    res.status(201).json({ data: book });
});

// PUT /api/books/:id - update a book (admin only, full body required)
router.put('/:id', requireAdmin, validateBook, (req, res) => {
    const fields = req.validatedBook;

    if (isbnTaken(fields.isbn, req.book.id)) {
        throw new HttpError(409, 'Conflict', `A book with isbn ${fields.isbn} already exists`);
    }

    const updated = {
        id: req.book.id,
        ...fields,
        createdAt: req.book.createdAt
    };

    books[req.bookIndex] = updated;
    res.json({ data: updated });
});

// DELETE /api/books/:id - delete a book (admin only)
router.delete('/:id', requireAdmin, (req, res) => {
    const [deleted] = books.splice(req.bookIndex, 1);

    res.json({
        message: `Book '${deleted.title}' deleted`,
        data: deleted
    });
});

module.exports = router;
