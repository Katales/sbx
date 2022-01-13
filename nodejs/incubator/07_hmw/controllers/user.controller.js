// noinspection ExceptionCaughtLocallyJS

const userMod = require('./../db/user.model');
const pwdSrv = require('../services/password');
const miscSrv = require('../services/misc.services');
const ApiError = require("../errors/ApiError.class");
const authMod = require("../db/auth.model");

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const qq = await userMod.find().lean();
            for (let q of qq) {
                q = miscSrv.normalizeMngUser(q);
            }
            res.json(qq);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            let q = await userMod.findById(req.params.userId).lean();
            if (!q) {
                throw new ApiError(`User doesn't exist (with ID=${req.params.userId})`,
                    400, 'Error!');
            }
            q = miscSrv.normalizeMngUser(q);
            res.json(q);
        } catch (e) {
            next(e);
            //
        }
    },

    newUser: async (req, res, next) => {
        try {
            req.body.password = await pwdSrv.mkHash(req.body.password);
            let q = (await userMod.create(req.body)).toObject();
            if (!q) {
                throw new ApiError('User wasn\'t added to DB',
                    400, 'Error!');
            } else {
                q = miscSrv.normalizeMngUser(q);
            }
            res.json(q);
        } catch (e) {
            next(e);
        }
    },

    updUserById: async (req, res, next) => {
        try {
            if (req.body.password)
            {req.body.password = await pwdSrv.mkHash(req.body.password);}
            let q = await userMod.findByIdAndUpdate(req.params.userId, req.body,
                {
                    new: true,
                    runValidators: true,
                    lean: true
                }
            );
            if (!q) {
                throw new ApiError(`User doesn't exist (with ID=${req.params.userId})`,
                    400, 'Error!');
            }
            q = miscSrv.normalizeMngUser(q);
            res.json(q);
        } catch (e) {
            next(e);
        }
    },

    delUserById: async (req, res, next) => {
        try {
            let q = await userMod.findByIdAndDelete(req.params.userId).lean();
            if (!q) {
                throw new ApiError(`User doesn't exist (with ID=${req.params.userId})`,
                    400, 'Error!');
            }
            await authMod.deleteMany({user_id: req.params.userId});
            q = miscSrv.normalizeMngUser(q);
            res.json(q);
        } catch (e) {
            next(e);
        }
    }
};
