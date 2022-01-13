const path = require('path');

const dbRelPath = '../db/db.json';
const dbPath = path.join(__dirname, dbRelPath);
const db = require(dbPath);
const fspw = require('../modules/fs.promise.wrapers');
const clientDbSrv = require('../db/client.db.services');

module.exports = {
    getClients: (req, res) => {
        res.json(db.clients);
    },

    getClientById: (req, res) => {
        const clientId = +req.params.clientId;
        const ind = clientDbSrv.getIndByFieldVal(db.clients, 'id', clientId);
        if (!ind) {res.send('ERROR: no record with ID: '+clientId);}
        res.json(db.clients[ind]);
    },

    newClient: async (req, res) => {
        const newId = clientDbSrv.getNewId(db.clients);
        db.clients.push({id: newId, ...req.body});
        await fspw.writeFileJSON(dbPath, db);
        res.json(db.clients);
    },

    updClientById: async (req, res) => {
        const clientId = +req.params.clientId;
        const ind = clientDbSrv.getIndByFieldVal(db.clients, 'id', clientId);
        if (!ind) {res.send('ERROR: no record with ID:'+clientId);}
        db.clients[ind]={id: clientId, ...req.body};
        await fspw.writeFileJSON(dbPath, db);
        res.json(db.clients[ind]);
    },

    delClientById: async (req, res) => {
        const clientId = +req.params.clientId;
        const ind = clientDbSrv.getIndByFieldVal(db.clients, 'id', clientId);
        if (!ind) {res.send('ERROR: no record with ID:'+clientId);}
        db.clients.splice(ind, 1);
        await fspw.writeFileJSON(dbPath, db);
        res.json(db.clients);
    }
};
