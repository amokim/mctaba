const METHODS_WITH_BODY = ['POST', 'PUT', 'PATCH'];

// Function to mask the password field data
function maskPasswords(data) {
    if (Array.isArray(data)) {
        return data.map(maskPasswords);
    }

    if (data !== null && typeof data === 'object') {
        const masked = {};
        for (const [key, value] of Object.entries(data)) {
            masked[key] = key.toLowerCase() === 'password' ? '***' : maskPasswords(value)
        }
        return masked;
    }
    return data;
}

const logger = (req, res, next) => {
    const start = Date.now();
    const timestamp = new Date(start).toISOString();

    res.on('finish', () => {
        const duration  = Date.now() - start;
        let line = `[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

        const hasBody = req.body && Object.keys(req.body).length > 0;
        if (METHODS_WITH_BODY.includes(req.method) && hasBody) {
            line += ` ${JSON.stringify(maskPasswords(req.body))}`;
        }

        console.log(line);
    });

    next();
};

module.exports = logger;