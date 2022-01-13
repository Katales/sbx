const jwt = require('jsonwebtoken');

const {TKN} = require('../conf/constants');
const ApiError = require("../errors/ApiError.class");

const genToken = (payload, tknType) => {
    if (!TKN.TYPE[tknType]) {
        throw new Error('Unknown token type! (none of ' + Object.values(TKN.TYPE) + ')'); }
    return jwt.sign(
        payload,
        TKN.SECRET[tknType],
        {expiresIn: TKN.EXP[tknType]});
};

module.exports = {
    genToken,
    genTokenPair: () => {
        const accToken = genToken({}, TKN.TYPE.ACCESS);
        const rfrToken = genToken({}, TKN.TYPE.REFRESH);
        return {
            accToken,
            rfrToken
        };
    },

    verifyToken: (token, tknType = TKN.TYPE.ACCESS) => {
        try {
            if (!token) {
                //noinspection ExceptionCaughtLocallyJS
                throw new Error('Token wasn\'t provided! (null or undefined)');
            }
            if (!TKN.TYPE[tknType]) {
                // noinspection ExceptionCaughtLocallyJS
                throw new Error('Unknown token type! (none of ' + Object.values(TKN.TYPE) + ')');
            }
            jwt.verify(token, TKN.SECRET[tknType]);
            return true;
        } catch (e) {
            throw new ApiError(e, 401, 'Token error');
        }
    }
};
