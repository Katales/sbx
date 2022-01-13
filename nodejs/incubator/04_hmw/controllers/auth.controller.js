const userMod = require('../db/user.model');
const pwdSrv = require('../services/password');

module.exports = {
    testUserCred: async (req, res) => {
        try {
            let resp = 'Authentication is OK';
            const q = await userMod.findOne({email: req.body.email});
            if (!q ||
                !(await pwdSrv.isPwdMatch(req.body.password, q.password)) )
            {resp = 'ERROR: user/password pair is incorrect';}
            res.json(resp);
        } catch (e) {
            res.json(e);
        }
    }
};
