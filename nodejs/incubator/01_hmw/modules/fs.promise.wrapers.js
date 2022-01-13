// DEPENDENCIES
const fsp = require('fs/promises');
// require("path");
const fsc = require('fs').constants;

/* eslint-disable no-console */
// BODY
const readDir = async (dirPath) => {
    try {
        return await fsp.readdir(dirPath, { withFileTypes: true });
    }catch (e) {
        console.log(`readDir> Error reading ${dirPath}:\n`,e);
    }
};

const readFile = async (filePath) => {
    try {
        return await fsp.readFile(filePath);
    } catch (e) {
        console.log(`readFile> Error reading file ${filePath}.\n`,e);
    }
};

const readFileJSON = async (filePath) => 
    JSON.parse((await readFile(filePath)).toString());

const writeFile = async (filePath, data) => {
// write data to file in JSON format
    try {
        await fsp.writeFile(filePath, data);
        console.log(`writeFile> created file ${filePath}}`);
    } catch (e) {
        console.log(`ERROR writing to ${filePath}\n${e}`);
        return false;
    }
    return true;
};

const writeFileJSON = (filePath, data) =>
    writeFile(filePath, JSON.stringify(data));

const mvFile = async (srcFilePath, dstFilePath) => {
    try {
        await fsp.rename(srcFilePath, dstFilePath);
    }catch (e) {
        console.log(`moveFile> Error renaming/moving ${srcFilePath}\n`,e);
        return false;
    }
    return true;
};

const rmFile = async (filePath, options) => {
    try {
        await fsp.rm(filePath, options);
    } catch (e) {
        console.log('');
    }
    return true;
};

const rmDir = async (filePath, options) => {
    try {
        await fsp.rmdir(filePath, options);
    } catch (e) {
        console.log('');
    }
    return true;
};

const dirChk = async (dirPath) => {
// check existence of dirPath

    try {
        await fsp.access(dirPath, fsc.F_OK);
    }catch(e) {
        console.log(`dirChk> Error checking write access for ${dirPath}:\n`,e);
        return false;
    }
    return true;
};

const dirChkCreate = async (dirPath) => {
// check existence of dirPath, if absent -create one

    try {
        await fsp.access(dirPath, fsc.W_OK);
    }catch(e) {
        if (e.code === 'ENOENT') {
            try { // dirPath is not existent - create !
                console.log(`dirChkCreate> creating ${dirPath}:`);
                await fsp.mkdir(dirPath);
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

// EXPORTS
module.exports = {
    dirChk,
    dirChkCreate,
    readDir,
    readFile,
    readFileJSON,
    writeFile,
    writeFileJSON,
    mvFile,
    rmFile,
    rmDir
};
