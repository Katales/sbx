const userMod = require('./../db/user.model');

// *****  MIDDLEWARE
module.exports = {

    newUser: async (req, res, next) => {
        try {
            const q = await userMod.findOne({email: req.body.email});
            if (q) {
                res.json('User with this email already exists');
                return;
            }
            next();
        } catch (e) {
            res.json(e);
        }
    },

    updUserById: async (req, res, next) => {
        try {
            if (req.body.email) {
                const qq = await userMod.find({email: req.body.email});
                if (qq.length === 1 && req.params.userId !== qq[0]._id.toString()) {
                    res.json(`Email ${req.body.email} belongs to another user!`);
                    return;
                }
            }
            next();
        } catch (e) {
            res.json(e);
        }
    }
};


