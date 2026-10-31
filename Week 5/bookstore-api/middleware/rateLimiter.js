// Simple in-memory rate limiter: 50 requests per minute per IP
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 50;

const hits = new Map(); // ip -> { count, windowStart }

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const entry = hits.get(ip);

    // first request from this IP, or the previous window has expired
    if (!entry || now - entry.windowStart >= WINDOW_MS) {
        hits.set(ip, { count: 1, windowStart: now });
        return next();
    }

    entry.count++;

    if (entry.count > MAX_REQUESTS) {
        const retryAfter = Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000);
        res.set('Retry-After', String(retryAfter));
        return res.status(429).json({
            error: 'Too Many Requests',
            message: `Limit of ${MAX_REQUESTS} requests per minute exceeded. Try again in ${retryAfter} seconds`
        });
    }

    next();
};

// clear out expired entries so the map does not grow forever
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of hits) {
        if (now - entry.windowStart >= WINDOW_MS) hits.delete(ip);
    }
}, WINDOW_MS).unref();

module.exports = rateLimiter;
