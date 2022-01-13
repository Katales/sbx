const router = require('express').Router();

const rootCtrl = require("../controllers/root.controller");
const chkData = require('../middleware/authChkData.mw');
const authCtrl = require('../controllers/auth.controller');

router.get('/', rootCtrl.getRules);
// AUTHORISE user
router.post('/auth/user', chkData.authFieldsExist, authCtrl.testUserCred);

module.exports = {
    authRouter: router
};
