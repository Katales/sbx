class ApiError extends Error {
    constructor(message, statusCode, name) {
        super(message);
        this.name = name || 'Bad Request';
        this.statusCode = statusCode || 400;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;

