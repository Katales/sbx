// eslint-disable-next-line new-cap
const router = require('express').Router();

const chkData = require('../middleware/userChkData.mw');
const chkConsist = require('../middleware/userChkDbConsist.mw');
const userCtrl = require('../controllers/user.controller');
const authMw = require('../middleware/auth.mw');

// Create
router.post('/', authMw.chkAccToken, chkData.newUser, chkConsist.newUser, userCtrl.newUser);
// Retrieve
router.get('/', authMw.chkAccToken, userCtrl.getUsers);
router.get('/:userId', authMw.chkAccToken, userCtrl.getUserById);

// Update
router.put('/:userId',
    authMw.chkAccToken,
    chkData.updUserById,
    chkConsist.updUserById,
    userCtrl.updUserById
);

// Delete
router.delete('/:userId',
    authMw.chkAccToken,
    userCtrl.delUserById
);

module.exports = {
    userRouter: router
};
