const express = require('express');
const cors = require('cors');

const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const bookRoutes = require('./routes/books');
const categoryRoutes = require('./routes/categories');
const authorRoutes = require('./routes/authors');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// comma-separated list of frontends allowed to call the API, e.g. the Vercel URL
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map(origin => origin.trim().replace(/\/$/, ''));

const corsOptions = {
    origin: (origin, callback) => {
        // no origin = curl, Postman or server-to-server requests
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-admin-key']
};

// Middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Bookstore API',
        version: '1.0.0',
        endpoints: {
            listBooks: 'GET /api/books?search=&category=&inStock=&sort=title|author|price|createdAt&order=asc|desc&page=&limit=',
            getBook: 'GET /api/books/:id',
            createBook: 'POST /api/books (x-admin-key header)',
            updateBook: 'PUT /api/books/:id (x-admin-key header)',
            deleteBook: 'DELETE /api/books/:id (x-admin-key header)',
            categories: 'GET /api/categories',
            authors: 'GET /api/authors',
            authorBooks: 'GET /api/authors/:id/books',
            health: 'GET /api/health'
        }
    });
});

// GET /api/health - used by Railway and for quick checks
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: Math.round(process.uptime()),
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/admin', adminRoutes);

// 404 and error handling - must come after all routes
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Bookstore API running on http://localhost:${PORT}`);
});
