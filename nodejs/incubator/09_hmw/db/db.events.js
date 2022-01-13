/* eslint-disable no-console */
const userMod = require("./user.model");
const users = require("./user.db.json");
const {DB_HOST, DB_PORT, DB_NAME} = process.env;

async function populateDb() {

    await userMod.create(users);

}

const onConnectMdb = async () => {
    console.log(`Connected to MongoDB on URL: mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

    if (!(await userMod.find({})).length) {
        populateDb().then(() =>
            console.log('DB has been populated with default data.')
        );
    }
};

module.exports = {
    onConnectMdb
};
