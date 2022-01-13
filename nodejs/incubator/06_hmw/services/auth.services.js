const userMod = require("../db/user.model");
const pwdSrv = require("../services/password");
const ApiError = require("../errors/ApiError.class");


module.exports = {

    testUserCred: async (email, password) => {
        const q = await userMod.findOne({email});
        if (!q ||
            !(await pwdSrv.isPwdMatch(password, q.password))) {
            throw new ApiError('User/password pair is incorrect',
                401, 'Authentication failed.');
        }
        return q._id;
    }
};
