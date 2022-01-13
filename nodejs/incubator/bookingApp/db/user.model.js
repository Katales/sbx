const mongoose = require('mongoose');

const cnst = require('../conf/constants');
const miscSrv = require("../services/misc.services");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            match: cnst.NAME_REGEXP
        },
        phone: {
            type: String,
            unique: true,
            trim: true,
            match: cnst.PHONE_REGEXP
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            match: cnst.EMAIL_REGEXP
        },
        loginType: {
            type: String,
            enum: Object.values(cnst.LOGIN_TYPE),
            required: true
        },
        password: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: Object.values(cnst.USER_ROLE)
        },
        starsS: {
            type: Number,
            default: 0,
            min: 0,
            select: false
        },
        starsQ: {
            type: Number,
            default: 0,
            min: 0,
            select: false
        }
    },
    {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    }
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

userSchema.virtual('stars').get(function() {
    return this.starsS / this.starsQ;
});


module.exports = mongoose.model('user', userSchema,'user');
