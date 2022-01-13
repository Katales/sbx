const router = require('express').Router();

const rootCtrl = require("../controllers/root.controller");

router.get('/', rootCtrl.getRules);

module.exports = {
    rootRouter: router
};
