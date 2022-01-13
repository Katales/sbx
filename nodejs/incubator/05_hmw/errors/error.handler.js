const ApiError = require('./ApiError.class');

// eslint-disable-next-line no-unused-vars
function errHandlerMain(err, req, res, next) {
    if (err instanceof ApiError) {
        res.status(err.statusCode)
            .json({
                ErrorName: err.name || 'Internal Server Error',
                ErrMessage: err.message
            });
        // eslint-disable-next-line no-console
        console.log(`API Error # ${err.statusCode} (${err.name}) : ${err.message}`);
    } else {
        // eslint-disable-next-line no-console
        console.log(err.stack);
    }
}

module.exports = errHandlerMain;
