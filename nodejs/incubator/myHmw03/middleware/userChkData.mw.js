const userMod = require('./../db/user.model');

// *****  MIDDLEWARE
module.exports = {

    newUser: async (req, res, next) => {
        try {
            if (!allFieldsDefined(req.body)) {
                res.json('"name", "email", "password", "userdomain" are ALL mandatory fields!');
                return;
            }
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
            if (!anyFieldDefined(req.body)) {
                res.json('None of a collection fields was set!');
                return;
            }
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

function allFieldsDefined(rec) {
    let ret = true;
    switch (true) {
        case rec.name === undefined :
            ret = ret && false;
            break;
        case rec.email === undefined :
            ret = ret && false;
            break;
        case rec.password === undefined :
            ret = ret && false;
            break;
        case rec.userdomain === undefined :
            ret = ret && false;
    }
    return ret;
}

function anyFieldDefined(rec) {
    let ret = false;
    switch (true) {
        case rec.name !== undefined :
            ret = ret || true;
            break;
        case rec.email !== undefined :
            ret = ret || true;
            break;
        case rec.password !== undefined :
            ret = ret || true;
            break;
        case rec.userdomain !== undefined :
            ret = ret || true;
    }
    return ret;
}
