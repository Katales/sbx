const mongoose = require('mongoose');

const cnst = require('../conf/constants');
const miscSrv = require("../services/misc.services");

const userSchema = new mongoose.Schema({
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
{timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}}
);

userSchema.methods = {
    normalize(){
        return miscSrv.rmFields(this.toObject(), [
            'password',
            '__v'
        ]);
    }
};

userSchema.statics = {

};

userSchema.virtual('fromAddr').get(function() {
    return `${this.name} <${this.email}>`;
});


module.exports = mongoose.model('user', userSchema,'user');
