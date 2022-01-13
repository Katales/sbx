const router = require('express').Router();
const clientCtrl = require('../controllers/client.controller');
const rootCntrl = require('../controllers/root.controller');

router.get('/', rootCntrl.getRules );
// Create
router.post('/clients', clientCtrl.newClient);
// Retrieve
router.get('/clients', clientCtrl.getClients);
router.get('/clients/:clientId', clientCtrl.getClientById);
// Update
router.put('/clients/:clientId', clientCtrl.updClientById);
// Delete
router.delete('/clients/:clientId', clientCtrl.delClientById);

module.exports = {
    clientRouter: router
};
