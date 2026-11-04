const express = require('express');
const books = require('../data/books');
const { HttpError, slugify } = require('../utils/helpers');

const router = express.Router();

// authors are built from the books list so they always match the current data
const getAuthors = () => {
    const authors = new Map();

    books.forEach(b => {
        const id = slugify(b.author);
        if (!authors.has(id)) authors.set(id, { id, name: b.author, bookCount: 0 });
        authors.get(id).bookCount++;
    });

    return [...authors.values()].sort((a, b) => a.name.localeCompare(b.name));
};

// GET /api/authors - all authors with their book counts
router.get('/', (req, res) => {
    res.json({ data: getAuthors() });
});

// GET /api/authors/:id/books - every book by one author (id is the slug, e.g. ngugi-wa-thiongo)
router.get('/:id/books', (req, res) => {
    const author = getAuthors().find(a => a.id === req.params.id);

    if (!author) {
        throw new HttpError(404, 'Not Found', `Author '${req.params.id}' does not exist`);
    }

    res.json({
        author,
        data: books.filter(b => slugify(b.author) === author.id)
    });
});

module.exports = router;
