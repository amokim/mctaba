class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "AppError";
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

function errorHandler(err, req, res, next) {
    const isAppError = err instanceof AppError;

    const statusCode = isAppError ? err.statusCode: 500;
    const message = isAppError ? err.message : "Something went wrong";

    if (!isAppError) {
        console.error(err);
    }

    const error = { message, statusCode };

    if (process.env.NODE_ENV === "development") {
        error.stack = err.stack;
    }

    res.status(statusCode).json({ success: false, error});
}

module.exports = { AppError, errorHandler };