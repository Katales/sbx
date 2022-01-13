//  MIDDLEWARE
module.exports = {

    authFieldsExist: (req, res, next) => {
        try{
            if (!req.body.email ||
                !req.body.password) {
                res.json('"email" and "password" are mandatory fields!');
                return;
            }
            next();
        } catch (e) {
            res.json(e);
        }
    }
};
