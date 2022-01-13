const fsp = require('fs/promises');
const path = require('path');
const fspw = require('./modules/fs.promise.wrapers');
// ENTRY POINT
const dirDelPath = path.join(__dirname, 'people\\backup');
rmrf(dirDelPath);

async function rmrf(filePath) {

    const fStat = await fsp.lstat(filePath);
    switch (true) {
        case fStat.isFile():
            await fspw.rmFile(filePath);
            console.log(`DELETE file:`, filePath);
            break;
        case fStat.isDirectory():
            console.log(`>DIR:`, filePath);
            const dirList = await fspw.readDir(filePath);
            // console.log(dirList);
            for (const dirItem of dirList) {
                await rmrf(path.join(filePath,dirItem.name));
            }
            await fspw.rmDir(filePath);
            console.log(`DELETE DIR:`, filePath);
            break;
      default:
          console.log('default case');
    }

}
