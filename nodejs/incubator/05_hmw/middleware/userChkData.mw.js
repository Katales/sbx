// noinspection ExceptionCaughtLocallyJS

const validator = require('../validators/user.validator');
const ApiError = require("../errors/ApiError.class");

// *****  MIDDLEWARE
module.exports = {

    newUser: (req, res, next) => {
        try {
            const {error: valErr} = validator.newUserData.validate(req.body);
            if (valErr) {
                throw new ApiError(valErr, 400, 'Field Validation failed (userChkData)!');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    updUserById: (req, res, next) => {
        try {
            if (!someFieldsDefined(req.body)) {
                throw new ApiError('None of a collection fields were set!',
                    400, 'Data Validation failed (userChkData)!');
            }
            const {error: valErr} = validator.updUserData.validate(req.body);
            if (valErr) {
                throw new ApiError(valErr,
                    400, 'Field Validation failed (userChkData)!');
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};

/**
 * Check if one of fields defined
 * @param rec - object with the fields to be checked
 * @returns {boolean} true - if at least onw field defined
 */
function someFieldsDefined(rec) {
    if (rec.name !== undefined) {return true;}
    if (rec.email !== undefined) {return true;}
    if (rec.password !== undefined) {return true;}
    return rec.userdomain !== undefined;
}
