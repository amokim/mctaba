// Centralized error handler - Express recognises it by the four parameters
const errorHandler = (err, req, res, next) => {
    // malformed JSON body sent to express.json()
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Request body contains invalid JSON'
        });
    }

    // request blocked by the CORS origin check in server.js
    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            error: 'Forbidden',
            message: `Origin ${req.get('origin')} is not allowed`
        });
    }

    const status = err.status || err.statusCode || 500;

    if (status >= 500) {
        console.error(err);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Something went wrong on the server'
        });
    }

    res.status(status).json({
        error: err.error || 'Error',
        message: err.message
    });
};

module.exports = errorHandler;
