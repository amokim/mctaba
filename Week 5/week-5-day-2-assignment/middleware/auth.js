const API_KEY = 'mctaba-2026-secret-key';

const auth = (req, res, next) => {
    const apiKey = req.get('x-api-key');

    if (!apiKey) {
        return res.status(401).json({
            error: 'API key required. Include x-api-key header.'
        });
    }

    if (apiKey !== API_KEY) {
        return res.status(401).json({
            error: 'Invalid API key'
        });
    }

    next();
};

module.exports = auth;