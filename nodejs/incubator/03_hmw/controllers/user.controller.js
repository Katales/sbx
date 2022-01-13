const userMod = require('../db/user.model');

module.exports = {
    getUsers: async (req, res) => {
        try {
            res.json(await userMod.find());
        } catch (e) {
            res.json(e);
        }
    },

    getUserById: async (req, res) => {
        try {
            let q = await userMod.findById(req.params.userId);
            if (!q) {q = 'Document NOT found ! ID: ' + req.params.userId;}
            res.json(q);
        } catch (e) {
            res.json(e);
            //
        }
    },

    newUser: async (req, res) => {
        try {
            res.json(await userMod.create(req.body));
        } catch (e) {
            res.json(e);
        }
    },

    updUserById: async (req, res) => {
        try {
            let q = await userMod.findByIdAndUpdate(req.params.userId, req.body, {new: true});
            if (!q) {q = 'Document NOT found ! ID: ' + req.params.userId;}
            res.json(q);
        } catch (e) {
            res.json(e);
        }
    },

    delUserById: async (req, res) => {
        try {
            let q = await userMod.findByIdAndDelete(req.params.userId);
            if (!q) {q = 'Document NOT found ! ID: ' + req.params.userId;}
            res.json(q);
        } catch (e) {
            res.json(e);
        }
    }
};
