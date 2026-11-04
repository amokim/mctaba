// Validation for POST and PUT /api/books bodies
const categories = require('../data/categories');
const { slugify } = require('../utils/helpers');

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

// digits with optional dashes, 10 or 13 digits in total (ISBN-10 / ISBN-13)
const isValidIsbn = (isbn) => {
    if (typeof isbn !== 'string' || !/^[\d-]+X?$/i.test(isbn)) return false;
    const digits = isbn.replace(/-/g, '').length;
    return digits === 10 || digits === 13;
};

const isValidUrl = (url) => typeof url === 'string' && /^https?:\/\/\S+$/.test(url);

// accepts "Self-Help", "self-help" or "self help" and returns the stored name
const findCategory = (value) =>
    typeof value === 'string' ? categories.find(c => c.id === slugify(value)) : undefined;

const validateBook = (req, res, next) => {
    const body = req.body;

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return res.status(400).json({
            error: 'Validation Error',
            messages: ['request body must be a JSON object']
        });
    }

    const { title, author, isbn, price, category, description, coverImage, inStock } = body;
    const messages = [];

    if (!isNonEmptyString(title)) messages.push('title is required');
    else if (title.trim().length > 200) messages.push('title must be 200 characters or fewer');

    if (!isNonEmptyString(author)) messages.push('author is required');

    if (isbn === undefined) messages.push('isbn is required');
    else if (!isValidIsbn(isbn)) messages.push('isbn must be 10 or 13 digits (dashes allowed)');

    if (price === undefined) messages.push('price is required');
    else if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
        messages.push('price must be a positive number (KES)');
    }

    if (category === undefined) messages.push('category is required');
    else if (!findCategory(category)) {
        messages.push(`category must be one of: ${categories.map(c => c.name).join(', ')}`);
    }

    if (description !== undefined && description !== null && typeof description !== 'string') {
        messages.push('description must be text');
    } else if (typeof description === 'string' && description.length > 2000) {
        messages.push('description must be 2000 characters or fewer');
    }

    if (coverImage !== undefined && coverImage !== null && coverImage !== '' && !isValidUrl(coverImage)) {
        messages.push('coverImage must be a URL starting with http:// or https://');
    }

    if (inStock !== undefined && typeof inStock !== 'boolean') {
        messages.push('inStock must be true or false');
    }

    if (messages.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            messages
        });
    }

    // hand the route a cleaned-up copy of the body
    req.validatedBook = {
        title: title.trim(),
        author: author.trim(),
        isbn: isbn.trim(),
        price,
        category: findCategory(category).name,
        description: typeof description === 'string' ? description.trim() : '',
        coverImage: coverImage || null,
        inStock: inStock ?? true
    };

    next();
};

module.exports = { validateBook };
