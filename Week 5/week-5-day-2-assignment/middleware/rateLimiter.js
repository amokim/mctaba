const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 1000;

// Tracks requests per IP: { count, firstRequest }
const requests = new Map();

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const entry = requests.get(ip);

    // First request from this IP, or the 60s window has passed - start a new window
    if (!entry || now - entry.firstRequest >= WINDOW_MS) {
        requests.set(ip, { count: 1, firstRequest: now });
        return next();
    }

    entry.count++;

    if (entry.count > MAX_REQUESTS) {
        const retryAfter = Math.ceil((entry.firstRequest + WINDOW_MS - now) / 1000);

        res.set('Retry-After', String(retryAfter));
        return res.status(429).json({
            error: `Too many requests. Try again in ${retryAfter} seconds.`,
            retryAfter
        });
    }

    next();
};

// Remove expired entries every minute so the Map doesn't grow forever
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of requests) {
        if (now - entry.firstRequest >= WINDOW_MS) {
            requests.delete(ip);
        }
    }
}, WINDOW_MS).unref();

module.exports = rateLimiter;
