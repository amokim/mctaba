// 404 handler - runs when no route matched the request
const notFound = (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.method} ${req.originalUrl} does not exist`
    });
};

module.exports = notFound;
