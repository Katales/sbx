const mongoose = require('mongoose');

const cnst = require('../conf/constants');

module.exports = mongoose.model('user',
   new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            match: /^[A-z-']{2,}$/
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z-.]+@[[a-zA-Z-.]+$/
        },
        password: {
            type: String,
            required: true,
            match: /^[!-~]{6,20}$/
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
