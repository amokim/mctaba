const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const bookRoutes = require('./routes/books');
const rateLimiter = require('./middleware/rateLimiter');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(rateLimiter);
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Bookstore API',
        version: '1.0.0',
        endpoints: {
            listBooks: 'GET /api/books?category=&author=&inStock=&search=&sort=title|author|price|price_desc|createdAt&order=asc|desc&page=&limit=',
            bookStats: 'GET /api/books/stats',
            getBook: 'GET /api/books/:id',
            relatedBooks: 'GET /api/books/:id/related',
            createBook: 'POST /api/books',
            replaceBook: 'PUT /api/books/:id',
            updateBook: 'PATCH /api/books/:id',
            deleteBook: 'DELETE /api/books/:id'
        }
    });
});

// Routes
app.use('/api/books', bookRoutes);

// 404 and error handling - must come after all routes
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
