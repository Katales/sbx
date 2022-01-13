const Joi = require('joi');

const cnst = require('../conf/constants');

module.exports = {
    newUserData: Joi.object({
        name: Joi
            .string()
            .required()
            .trim()
            .alphanum()
            .min(2)
            .max(20)
            .regex(cnst.NAME_REGEXP),
        email: Joi
            .string()
            .required()
            .trim()
            .regex(cnst.EMAIL_REGEXP),
        password: Joi
            .string()
            .required()
            .regex(cnst.PASSWORD_REGEXP),
        userdomain: Joi
            .string()
            .valid(...Object.values(cnst.userdom))
    }),
    updUserData: Joi.object({
        name: Joi
            .string()
            .trim()
            .alphanum()
            .regex(cnst.NAME_REGEXP),
        email: Joi
            .string()
            .trim()
            .regex(cnst.EMAIL_REGEXP),
        password: Joi
            .string()
            .regex(cnst.PASSWORD_REGEXP),
        userdomain: Joi
            .string()
            .valid(...Object.values(cnst.userdom))
    })
};
