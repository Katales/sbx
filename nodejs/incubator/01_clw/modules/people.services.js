/* eslint-disable */
// DEPENDENCIES
const fs = require('fs/promises');
const fsc = require('fs').constants;
const path = require('path');


// BODY
const dirChkCreate = async (dirPath) => {
// check existence of dirPath, if absent -create one

    try {
        await fs.access(dirPath, fsc.W_OK);
    }catch(e) {
        if (e.code === 'ENOENT') {
            try { // dirPath is not existent - create !
                console.log(`dirChkCreate> creating ${dirPath}:`);
                await fs.mkdir(dirPath);
            }catch(e) {
                console.log(`dirChkCreate> Error creating ${dirPath}:\n`, e);
                return false;
            }
        } else {
            console.log(`dirChkCreate> Error checking write access for ${dirPath}:\n`,e);
            return false;
        }
    }
    return true;
};

const createPersonFile = async (dirPath, person) => {
// write person's file

    const personFilePath = path.join(dirPath, person.name + '.json');
    try {
        await fs.writeFile(personFilePath, JSON.stringify(person));
        console.log(`createPersonFile> created file: ${personFilePath}`);
    } catch (e) {
        if (e.code === 'ENOENT') {
            if (! await dirChkCreate(dirPath)) {
                console.log(`ERROR checking dir: ${dirPath}\n${e}`);
                return false;
            }
            createPersonFile(dirPath, person);
        } else {
            console.log(`ERROR creating file: ${personFilePath}\n${e}`);
            return false;
        }
    }

    // if (await dirChkCreate(dirPath)) {
    //     try {
    //         const personFilePath = path.join(dirPath, person.name + '.json');
    //         await fs.writeFile(personFilePath, JSON.stringify(person));
    //         console.log(`createPersonFile> created file: ${personFilePath}`);
    //     } catch (e) {
    //         console.log(`ERROR creating file: ${personFilePath}\n${e}`);
    //         return false;
    //     };
    // } else {
    //     console.log(`ERROR checking dir: ${dirPath}\n${e}`);
    //     return false;
    // }
    return true;
};

module.exports = {
    dirChkCreate,
    createPersonFile,
};
