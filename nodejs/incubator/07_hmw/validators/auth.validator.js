const Joi = require('joi');

const cnst = require('../conf/constants');

module.exports = {
    authData: Joi.object({
        email: Joi
            .string()
            .required()
            .trim()
            .regex(cnst.EMAIL_REGEXP),
        password: Joi
            .string()
            .required()
            .trim()
            .regex(cnst.PASSWORD_REGEXP),
    })
};
