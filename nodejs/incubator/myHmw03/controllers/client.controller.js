const clientMod = require('./../db/client.model');

module.exports = {
    getClients: async (req, res) => {
        try {
            res.json(await clientMod.find());
        } catch (e) {
            res.json(e);
        }
    },

    getClientById: async (req, res) => {
        try {
            let q = await clientMod.findById(req.params.clientId);
            if (!q) {
                q = ('Document NOT found ! ID: ' + req.params.clientId);
            }
            res.json(q);
        } catch (e) {
            res.json(e);
            //
        }
    },

    newClient: async (req, res) => {
        try {
            res.json(await clientMod.create(req.body));
        } catch (e) {
            res.json(e);
        }
    },

    updClientById: async (req, res) => {
        try {
            let q = await clientMod.findByIdAndUpdate(req.params.clientId, req.body, {new: true});
            if (!q) {
                q = ('Document NOT found ! ID: ' + req.params.clientId);
            }
            res.json(q);
        } catch (e) {
            res.json(e);
        }
    },

    delClientById: async (req, res) => {
        try {
            let q = await clientMod.findByIdAndDelete(req.params.clientId);
            if (!q) {
                q = ('Document NOT found ! ID: ' + req.params.clientId);
            }
            res.json(q);
        } catch (e) {
            res.json(e);
        }
    }
};
