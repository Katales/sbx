const mongoose = require('mongoose');

const {MONGO_CONNECT_URL} = require('./conf/constants');
const userMod = require('./db/user.model');
const users = require('./db/user.db.json');
const pwdSrv = require('./services/password');

main();


// ==== MAIN
async function main() {

    const pwd = 'asdfmn3jf93jdf';
    const hashed = await pwdSrv.mkHash(pwd);
    console.log('hashed:', hashed);

    if (await pwdSrv.isPwdMatch(pwd, hashed)) {
        console.log('Password matches its hash!');
    } else {
        console.log('ERROR - no match !');
    }


    await mongoose.connect(MONGO_CONNECT_URL);

    populateDb();
    // doDbTasks();
}


// ============================
// async function doDbTasks() {
//     let q = await userMod.findById('616211c28877ae0ebe7122f0');
//     // console.log('GOT', q.length, 'RECORDS');
//     console.log('doc.ID:', q._id);
//     console.log('doc.ID:', q._id.toString());
//     console.log('password:', q.password);
//     q.password = 'passPhrase';
//
//     console.log(q);
// }

async function populateDb() {

    userMod.collection.drop();

    for (const el of users) {
        el.password = await pwdSrv.mkHash(el.password);
    }

    await userMod.create(users);

}

