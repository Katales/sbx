const mongoose = require('mongoose');

const tknSrv = require("../services/token.services");
const miscSrv = require("../services/misc.services");

const authSchema = new mongoose.Schema({
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
);

authSchema.pre('findOne', function(){
    this.populate('user_id');
});

authSchema.methods = {
    normalize() {
        return miscSrv.rmFields(this.toObject(), [
            '__v',
            '_id'
        ]);
    }
};

authSchema.statics = {
    // has async action - should be called with AWAIT !
    renewTokenPair(rfrToken) {
        const tokenPair = tknSrv.genTokenPair();
        return this.findOneAndUpdate(
            {rfrToken},
            {...tokenPair},
            {
                new: true,
                runValidators: true
            }
        );
    },

};
    
module.exports = mongoose.model('auth', authSchema, 'auth');


// tests in Postman !!!
//
// pm.test("Status code is 200", function () {
//     pm.response.to.have.status(200);
// });
//
// const jsonBody = JSON.parse(responseBody);
//
// pm.environment.set("access_token", jsonBody.access_token);
// pm.environment.set("refresh_token", jsonBody.refresh_token);
