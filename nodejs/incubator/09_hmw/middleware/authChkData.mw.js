const validator = require('../validators/auth.validator');
const ApiError = require('../errors/ApiError.class');

//  MIDDLEWARE
module.exports = {

    authFieldsExist: (req, res, next) => {
        try {
            const {error: valErr} = validator.authData.validate(req.body);
            if (valErr) {
                // noinspection ExceptionCaughtLocallyJS
                throw new ApiError(valErr, 400, 'Field Validation failed (auth)!');
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
