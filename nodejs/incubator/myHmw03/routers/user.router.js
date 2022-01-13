const router = require('express').Router();

const chkData = require('../middleware/userChkData.mw');
const chkConsist = require('../middleware/userChkDbConsist.mw');
const userCtrl = require('../controllers/user.controller');
const rootCtrl = require("../controllers/root.controller");

router.get('/', rootCtrl.getRules);
// Create
router.post('/users', chkData.newUser, chkConsist.newUser, userCtrl.newUser);
// Retrieve
router.get('/users', userCtrl.getUsers);
router.get('/users/:userId', userCtrl.getUserById);
// Update
router.put('/users/:userId', chkData.updUserById, chkConsist.updUserById, userCtrl.updUserById);
// Delete
router.delete('/users/:userId', userCtrl.delUserById);

module.exports = {
    userRouter: router
};
