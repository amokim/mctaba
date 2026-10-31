// Request validation middleware for book bodies

const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';

// digits and dashes only, at least 10 characters
const isValidIsbn = (isbn) => typeof isbn === 'string' && /^[\d-]{10,}$/.test(isbn);

const isValidUrl = (url) => typeof url === 'string' && /^https?:\/\/\S+$/.test(url);

// the only categories a book can be in
const CATEGORIES = ['fiction', 'biography', 'business', 'history'];

const isValidCategory = (v) => isNonEmptyString(v) && CATEGORIES.includes(v.trim().toLowerCase());

// each rule returns an error message, or null when the value is fine
const rules = {
    title: (v) => isNonEmptyString(v) ? null : 'title must be a non-empty string',
    author: (v) => isNonEmptyString(v) ? null : 'author must be a non-empty string',
    isbn: (v) => isValidIsbn(v) ? null : 'isbn must contain only digits and dashes (at least 10 characters)',
    price: (v) => typeof v === 'number' && v > 0 ? null : 'price must be a positive number',
    category: (v) => isValidCategory(v) ? null : `category must be one of: ${CATEGORIES.join(', ')}`,
    inStock: (v) => typeof v === 'boolean' ? null : 'inStock must be true or false',
    coverImage: (v) => v === null || isValidUrl(v) ? null : 'coverImage must be a valid URL starting with http:// or https://'
};

const requiredFields = ['title', 'author', 'isbn', 'price', 'category'];

// factory: partial = true only checks fields that were sent (PATCH)
const validate = ({ partial = false } = {}) => (req, res, next) => {
    const body = req.body;

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return res.status(400).json({
            error: 'Validation Error',
            messages: ['request body must be a JSON object']
        });
    }

    const messages = [];

    if (!partial) {
        requiredFields.forEach(field => {
            if (body[field] === undefined) messages.push(`${field} is required`);
        });
    }

    Object.keys(rules).forEach(field => {
        if (body[field] === undefined) return;
        const message = rules[field](body[field]);
        if (message) messages.push(message);
    });

    if (partial && !Object.keys(rules).some(field => body[field] !== undefined)) {
        messages.push(`provide at least one of: ${Object.keys(rules).join(', ')}`);
    }

    if (messages.length > 0) {
        return res.status(400).json({
            error: 'Validation Error',
            messages
        });
    }

    next();
};

const validateBook = validate();
const validateBookPatch = validate({ partial: true });

module.exports = { validate, validateBook, validateBookPatch };
