const mongoose = require('mongoose');

const {MONGO_CONNECT_URL} = require('./conf/constants');
const userMod = require('./db/user.model');

main();

// ==== MAIN
async function main() {

    await mongoose.connect(MONGO_CONNECT_URL);
    const user = {
        name: "Sandra",
        // email: "Sander@gaze.su1",
        // password: "wTf01_&4",
        userdomain: "RETAIL"
    };
    const userId = '6165a2f349ccd1d931100f5a';

    try {
        const q = await userMod.findByIdAndUpdate(userId, user,
            {
                new: true,
                runValidators: true,
                lean: true
            }
        );
        console.log('Result of create: '+JSON.stringify(q, null, 4));
    } catch (e) {
        console.log(e);
    }

};
