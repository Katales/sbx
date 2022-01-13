const validator = require('../validators/auth.validator');

//  MIDDLEWARE
module.exports = {

    authFieldsExist: (req, res, next) => {
        try {
            const {error: valErr} = validator.authData.validate(req.body);
            if (valErr) {
                res.json('Validation failed! ' + valErr);
                return;
            }
            next();
        } catch (e) {
            res.json(e);
        }
    }
};
