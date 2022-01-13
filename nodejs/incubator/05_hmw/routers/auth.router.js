const router = require('express').Router();

const chkData = require('../middleware/authChkData.mw');
const authCtrl = require('../controllers/auth.controller');

router.post('/user', chkData.authFieldsExist, authCtrl.testUserCred);

module.exports = {
    authRouter: router
};
