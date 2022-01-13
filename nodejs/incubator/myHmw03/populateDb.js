const mongoose = require('mongoose');

const {MONGO_CONNECT_URL} = require('./conf/constants');
const userMod = require('./db/user.model');
// const clientMod = require('./db/client.model');
// const {client} =require('./db/db.json');

execTask();

async function execTask() {

    await mongoose.connect(MONGO_CONNECT_URL);

    // populateDb();
    doDbTasks();
}


// ============================
async function doDbTasks() {
    const q = await userMod.findById('616211c28877ae0ebe7122f0');
    // console.log('GOT', q.length, 'RECORDS');
    console.log('doc.ID:', q._id);
    console.log('doc.ID:', q._id.toString());
    console.log('password:', q.password);
    q.password = 'passPhrase';

    console.log(q);
}

// async function populateDb() {
//
//     clientMod.collection.drop();
//     userMod.collection.drop();
//
//     clientMod.create(client);
//
//     await userMod.create(
//         [
//             {
//                 name: 'Mint',
//                 email: 'auro@well.com',
//                 password: 'asdfasdfhk',
//                 userdomain: userdom.RETAIL
//             },
//             {
//                 name: 'Xander',
//                 email: 'xander@gaze.su',
//                 password: 'wTf01_&4',
//                 userdomain: userdom.RETAIL
//             },
//             {
//                 name: 'Gillian',
//                 email: 'one.gill@gawk.com',
//                 password: 'wTf01_&4',
//                 userdomain: userdom.B2B
//             },
//             {
//                 name: "Gilian",
//                 email: "G.Andersen@xmatter.com",
//                 password: "qwE12&dj_&4",
//                 userdomain: userdom.B2B
//             }
//         ]
//     );
// };

