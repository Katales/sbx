const mongoose = require('mongoose');

const cnst = require('../conf/constants');

// eslint-disable-next-line no-unused-vars
const estateSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        space: {
            type: Number,
            min: 2,
            max: cnst.MAX_SPACE_SQM,
            required: true
        }
    },
    {
        timestamps: true,
        toObject: {virtuals: true},
        toJSON: {virtuals: true}
    }
);
