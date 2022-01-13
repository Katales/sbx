// DEPENDENCIES
const fsp = require('fs/promises');

// BODY
const readFile = async (filePath) => {
    try {
        return await fsp.readFile(filePath);
    } catch (e) {
        console.log(`readFile> Error reading file ${filePath}.\n`,e);
    }
};

const readFileJSON = async (filePath) => JSON.parse((await readFile(filePath)).toString());

const writeFile = async (filePath, data) => {
// write data to file in JSON format
    try {
        await fsp.writeFile(filePath, data);
        // console.log(`writeFile> written to ${filePath}}`);
    } catch (e) {
        console.log(`ERROR writing to ${filePath}\n${e}`);
        return false;
    }
    return true;
};


const writeFileJSON = (filePath, data) => writeFile(filePath, JSON.stringify(data, null, 4));

// EXPORTS
module.exports = {
    readFile,
    readFileJSON,
    writeFile,
    writeFileJSON
};
