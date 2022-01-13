// DEPENDENCIES
const path = require('path');
const fspw = require('./modules/fs.promise.wrapers');

// CONSTANTS
const peoplePath = path.join(__dirname, 'people');
const malePath = path.join(peoplePath, 'boyz');
const femalePath = path.join(peoplePath, 'galz');

//entry point
/* eslint-disable no-console */
main().then(() => {console.log('finished');});

// BODY of app.js
async function main() {

    if (!await sortPeople2Dir(malePath, femalePath)) {
        console.log(`main> CRITICAL Error, EXITING...`);
        return false;
    }
    if (!await sortPeople2Dir(femalePath, malePath)) {
        console.log(`main> CRITICAL Error, EXITING...`);
        return false;
    }
}

async function sortPeople2Dir(srcPath, dstPath) {

    let dstGender;
    switch (dstPath) {
        case malePath:
            dstGender = 'male';
            break;
        case femalePath:
            dstGender = 'female';
            break;
        default:
            console.log(`sortPeople2Dir> destination directory ${dstPath} is neither male nor female!`);
            return false;
    }

    const srcDirCont = await fspw.readDir(srcPath);
    if (!srcDirCont) {return false;}

    for (const dirItem of srcDirCont) {
        if (!dirItem.isFile()) {continue;}
        const srcFilePath = path.join(srcPath, dirItem.name);
        const person = (await fspw.readFileJSON(srcFilePath));
        if (!person ||
            person.gender !== dstGender ) {continue;}

        if (!await fspw.mvFile(srcFilePath, path.join(dstPath, dirItem.name) ) ) {
            console.log(`sortPeople2Dir> CRITICAL Error,EXITING...`);
            return false;
        }
    }
    return true;
}
