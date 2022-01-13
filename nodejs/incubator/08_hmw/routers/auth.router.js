const router = require('express').Router();

const chkData = require('../middleware/authChkData.mw');
const authCtrl = require('../controllers/auth.controller');
const authMw = require("../middleware/auth.mw");

router.post('/login', chkData.authFieldsExist, authCtrl.loginUser);
router.post('/renew', authMw.chkRfrToken, authCtrl.renewUserToken);
router.post('/logout', authMw.chkAccToken, authCtrl.logoutUser);
router.post('/logoutall', authMw.chkAccToken, authCtrl.logoutUserAllDev);

module.exports = {
    authRouter: router
};
