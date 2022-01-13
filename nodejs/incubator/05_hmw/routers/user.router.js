// eslint-disable-next-line new-cap
const router = require('express').Router();

const chkData = require('../middleware/userChkData.mw');
const chkConsist = require('../middleware/userChkDbConsist.mw');
const userCtrl = require('../controllers/user.controller');

// Create
router.post('/', chkData.newUser, chkConsist.newUser, userCtrl.newUser);
// Retrieve
router.get('/', userCtrl.getUsers);
router.get('/:userId', userCtrl.getUserById);
// Update
router.put('/:userId', chkData.updUserById, chkConsist.updUserById, userCtrl.updUserById);
// Delete
router.delete('/:userId', userCtrl.delUserById);

module.exports = {
    userRouter: router
};
