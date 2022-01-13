const userMod = require('../db/user.model');
const pwdSrv = require('../services/password');
const ApiError = require('../errors/ApiError.class');

module.exports = {
    testUserCred: async (req, res, next) => {
        try {
            const q = await userMod.findOne({email: req.body.email});
            if (!q ||
                !(await pwdSrv.isPwdMatch(req.body.password, q.password)) ) {
                // noinspection ExceptionCaughtLocallyJS
                throw new ApiError('User/password pair is incorrect',
                    401, 'Authentication failed.');
            }
            res.status(200).json('Authentication is OK');
        } catch (e) {
            next(e);
        }
    }
};
