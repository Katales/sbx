// noinspection ExceptionCaughtLocallyJS

const userMod = require('./../db/user.model');
const ApiError = require("../errors/ApiError.class");

// *****  MIDDLEWARE
module.exports = {

    newUser: async (req, res, next) => {
        try {
            const q = await userMod.findOne({email: req.body.email});
            if (q) {
                throw new ApiError('User with this email already exists',
                    400, 'Data Validation failed (user)!');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    updUserById: async (req, res, next) => {
        try {
            if (req.body.email) {
                const qq = await userMod.find({email: req.body.email});
                if (qq.length === 1 && req.params.userId !== qq[0]._id.toString()) {
                    throw new ApiError(`Email ${req.body.email} belongs to another user!`,
                        400, 'Data Validation failed (user)!');
                }
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};

