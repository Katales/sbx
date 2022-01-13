const userMod = require('../db/user.model');

module.exports = {
    testUserCred: async (req, res) => {
        try {
            let resp = 'Authentication is OK';
            const q = await userMod.findOne({email: req.body.email});
            if (!q ||
                q.password !== req.body.password)
            {resp = 'ERROR: user/password pair is incorrect';}
            res.json(resp);
        } catch (e) {
            res.json(e);
        }
    }
};
