// Global error handler - Express recognises it by the four parameters
const errorHandler = (err, req, res, next) => {
    // malformed JSON body sent to express.json()
    if (err.type === 'entity.parse.failed') {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Request body contains invalid JSON'
        });
    }

    const status = err.status || err.statusCode || 500;

    if (status === 500) console.error(err);

    res.status(status).json({
        error: status === 500 ? 'Internal Server Error' : err.name || 'Error',
        message: status === 500 ? 'Something went wrong on the server' : err.message
    });
};

module.exports = errorHandler;
