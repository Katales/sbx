const mongoose = require('mongoose');

const cnst = require('../conf/constants');

module.exports = mongoose.model('user',
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            match: /^[A-z-']{2,20}$/
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-.]+@[[\w-.]+$/
        },
        password: {
            type: String,
            required: true
        },
        userdomain: {
            type: String,
            required: true,
            enum: Object.values(cnst.userdom)
        }
    },
    {timestamps: true}
    ),
    'user'
);
