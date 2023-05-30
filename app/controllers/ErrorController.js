class ErrorController extends Error {
    constructor(message='Internal server error',statusCode=500) {
        super(message);
        console.log("Error Controller Initialized with: ", statusCode, message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

const AsyncError = func => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
}


module.exports = {
    ErrorController,
    AsyncError
};