// =========== DEPENDENCIES
const fsp = require("fs/promises");

// =========== INPUT DATA
const fileNm = 'test-person.json';
const person = [ { name: 'Mata', gender: 'female', age: 34 } ];

// =========== FUNCTIONS
async function test() {

    // prepare test env
    // eslint-disable-next-line no-use-before-define
    console.log(await writeFileJSON(fileNm, person) );

    //test await-return
    // eslint-disable-next-line no-use-before-define
    const fileCont = await readFileJSON(fileNm);
    console.log(`test> ${fileNm} =`, fileCont);
}

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
        console.log(`writeFile> created file ${filePath}}`);
    } catch (e) {
        console.log(`ERROR writing to ${filePath}\n${e}`);
        return false;
    }
    return true;
};

const writeFileJSON = (filePath, data) => writeFile(filePath, JSON.stringify(data));

// =========== ENTRY POINT
test();
