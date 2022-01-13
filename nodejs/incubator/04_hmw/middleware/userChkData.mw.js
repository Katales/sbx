const validator = require('../validators/user.validator');

// *****  MIDDLEWARE
module.exports = {

    newUser: (req, res, next) => {
        try {
            const {error: valErr} = validator.newUserData.validate(req.body);
            if (valErr) {
                res.json('Validation failed! '+valErr);
                return;
            }
            next();
        } catch (e) {
            res.json(e);
        }
    },

    updUserById: (req, res, next) => {
        try {
            if (!someFieldsDefined(req.body)) {
                res.json('None of a collection fields were set!');
                return;
            }
            const {error: valErr} = validator.updUserData.validate(req.body);
            if (valErr) {
                res.json('UpdateUserById: field validation failed! ' + valErr);
                return;
            }
            next();
        } catch (e) {
            res.json(e);
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
