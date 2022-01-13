const mongoose = require('mongoose');

module.exports = mongoose.model('auth',
    new mongoose.Schema({
        accToken: {
            type: String,
            required: true
        },
        rfrToken: {
            type: String,
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        }
    },
    {timestamps: true}
    ),
    'auth'
);
