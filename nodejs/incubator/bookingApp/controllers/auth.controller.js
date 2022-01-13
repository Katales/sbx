const authMod = require('../db/auth.model');
const tknSrv = require("../services/token.services");
const authSrv = require('../services/auth.services');
const {cronTask_heartbeat} = require("../cron");
// const mailSrv = require('../services/mail.services');
// const mailTmpl = require('../tmpl-email');

module.exports = {

    loginUser: async (req, res, next) => {
        try {
            const userId = await authSrv.testUserCred(req.body.email, req.body.password);
            const tokenPair = tknSrv.genTokenPair();
            await authMod.create({...tokenPair, user_id: userId});
            cronTask_heartbeat.start();
            res.status(200).json({...tokenPair, email: req.body.email, user_id: userId});
        } catch (e) {
            next(e);
        }
    },

    renewUserToken: async (req, res, next) => {
        try {
            const rfrToken = req.get('Authorization');
            // --- Case 1 - initial
            // const tokenPair = tknSrv.genTokenPair();
            // const q = await authMod.findOneAndUpdate(
            //     {rfrToken},
            //     {...tokenPair},
            //     {
            //         new: true,
            //         runValidators: true,
            //         lean: true
            //     }
            // ).populate('user_id');
            // const resp = {...tokenPair, ...miscSrv.normalizeMngUser(q.user_id)};
            // --- case.2 - using method of authMod
            const resp = (await authMod.renewTokenPair(rfrToken)).normalize();
            // --- End of Cases
            res.status(200).send(resp);
            next();
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try{
            const accToken = req.get('Authorization');
            const {user_id: user} = await authMod.findOneAndDelete({accToken}).populate('user_id');
            // const context = {
            //     userName: user.name,
            //     userEmail: user.email
            // };
            // await mailSrv.sendMail(user.email, mailTmpl.TYPE.LOGGED_OUT, context);
            cronTask_heartbeat.stop();
            res.status(200).send(`User ${user.email} logged out`);
        } catch (e) {
            next(e);
        }
    },

    logoutUserAllDev: async (req, res, next) => {
        try{
            const accToken = req.get('Authorization');
            const {user_id: user} = await authMod.findOne({accToken});
            await authMod.deleteMany({user_id: user._id});
            cronTask_heartbeat.stop();
            res.status(200).send(`User ${user.email} logged out of all devices`);
        } catch (e) {
            next(e);
        }
    }
};
