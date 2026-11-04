// Shared helpers used by routes and middleware

// an error carrying an HTTP status and error type - picked up by errorHandler
class HttpError extends Error {
    constructor(status, error, message) {
        super(message);
        this.status = status;
        this.error = error;
    }
}

// "Ngugi wa Thiong'o" -> "ngugi-wa-thiongo", "Self-Help" -> "self-help"
const slugify = (text) =>
    String(text)
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

module.exports = { HttpError, slugify };
