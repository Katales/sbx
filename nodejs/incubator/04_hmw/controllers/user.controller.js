const userMod = require('./../db/user.model');
const pwdSrv = require('../services/password');
const miscSrv = require('../services/misc.services');

module.exports = {
    getUsers: async (req, res) => {
        try {
            const qq = await userMod.find().lean();
            for (let q of qq) {
                q = miscSrv.rmFields(q, [
                    'password',
                    '__v'
                ]);
            }
            res.json(qq);
        } catch (e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {
        try {
            let q = await userMod.findById(req.params.userId).lean();
            if (!q) {q = 'Document NOT found ! ID: ' + req.params.userId;}
            q = miscSrv.rmFields(q, [
                'password',
                '__v'
            ]);
            res.json(q);
        } catch (e) {
            res.json(e);
            //
        }
    },

    newUser: async (req, res) => {
        try {
            req.body.password = await pwdSrv.mkHash(req.body.password);
            let q = (await userMod.create(req.body)).toObject();
            if (!q) {
                q = 'ERROR: Document wasn\'t added to DB';
            } else {
                q = miscSrv.rmFields(q, [
                    'password',
                    '__v'
                ]);
            }
            res.json(q);
        } catch (e) {
            res.json(e);
        }
    },

    updUserById: async (req, res) => {
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
            if (!q) {q = 'Document NOT found ! ID: ' + req.params.userId;}
            q = miscSrv.rmFields(q, [
                'password',
                '__v'
            ]);
            res.json(q);
        } catch (e) {
            res.json(e);
        }
    },

    delUserById: async (req, res) => {
        try {
            let q = await userMod.findByIdAndDelete(req.params.userId).lean();
            if (!q) {q = 'Document NOT found ! ID: ' + req.params.userId;}
            q = miscSrv.rmFields(q, [
                'password',
                '__v'
            ]);
            res.json(q);
        } catch (e) {
            res.json(e);
        }
    }
};
