// noinspection ExceptionCaughtLocallyJS

const {TKN} = require("../conf/constants");
const tknSrv = require("../services/token.services");
const authMod = require('../db/auth.model');
const ApiError = require("../errors/ApiError.class");

const chkAccToken = async (req, res, next) => {
    try {
        const accToken = req.get('Authorization');
        tknSrv.verifyToken(req.get('Authorization'), TKN.TYPE.ACCESS);
        const q = await authMod.findOne({accToken});
        if (!q) {
            throw new ApiError('User with this token isn\'t logged in.', 401);
        }
        next();
    } catch (e) {
        next(e);
    }
};

const chkRfrToken = async (req, res, next) => {
    try {
        const rfrToken = req.get('Authorization');
        tknSrv.verifyToken(req.get('Authorization'), TKN.TYPE.REFRESH) ;
        const q = await authMod.findOne({rfrToken});
        if (!q) {
            throw new ApiError('User with this token isn\'t logged in.', 401);
        }
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    chkAccToken,
    chkRfrToken
};
