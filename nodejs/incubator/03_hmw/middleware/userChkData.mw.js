
// *****  MIDDLEWARE
module.exports = {

    newUser: (req, res, next) => {
        try {
            if (!allFieldsDefined(req.body)) {
                res.json('"name", "email", "password", "userdomain" are ALL mandatory fields!');
                return;
            }
            next();
        } catch (e) {
            res.json(e);
        }
    },

    updUserById: (req, res, next) => {
        try {
            if (!anyFieldDefined(req.body)) {
                res.json('None of a collection fields was set!');
                return;
            }
            next();
        } catch (e) {
            res.json(e);
        }
    }
};

function allFieldsDefined(rec) {
    let ret = true;
    if (rec.name === undefined) {ret = ret && false;}
    if (rec.email === undefined) {ret = ret && false;}
    if (rec.password === undefined) {ret = ret && false;}
    if (rec.userdomain === undefined) {ret = ret && false;}
    return ret;
}

function anyFieldDefined(rec) {
    if (rec.name !== undefined) {return true;}
    if (rec.email !== undefined) {return true;}
    if (rec.password !== undefined) {return true;}
    return rec.userdomain !== undefined;
}
