const express = require('express');
const books = require('../data/books');
const categories = require('../data/categories');

const router = express.Router();

// GET /api/categories - every category with how many books it holds
router.get('/', (req, res) => {
    const data = categories.map(c => ({
        ...c,
        bookCount: books.filter(b => b.category === c.name).length
    }));

    res.json({ data });
});

module.exports = router;
