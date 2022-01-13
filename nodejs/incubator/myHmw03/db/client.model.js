const mongoose = require('mongoose');

module.exports = mongoose.model( 'client',
    new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
                match: /^[A-z-']{2,}$/
            },
            account: {
                type: String,
                unique: true,
                match: /^[0-9]{8}$/
            },
            user_id: {
                type: String
            }
        },
        {timestamps: true}
    ),
    'client'
);


