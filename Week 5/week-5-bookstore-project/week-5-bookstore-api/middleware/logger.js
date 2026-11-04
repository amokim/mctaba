// Custom request logger: [time] METHOD /url STATUS - 12.3 ms
const logger = (req, res, next) => {
    const start = process.hrtime.bigint();

    // 'finish' fires once the response has been sent, so the status code is known
    res.on('finish', () => {
        const ms = Number(process.hrtime.bigint() - start) / 1e6;
        const time = new Date().toISOString();
        console.log(`[${time}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${ms.toFixed(1)} ms`);
    });

    next();
};

module.exports = logger;
