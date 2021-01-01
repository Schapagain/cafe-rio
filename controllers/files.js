
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const { getError } = require('./errors');

/**
 * Save given files to the disk
 * Return randomly generated filenames
 * @param {File[]} files 
 */
async function saveFiles(files) {
    if (!files || !files.length) return [];
    const filePath = path.join('.','uploads'); 
    const writeFile = fs.promises.writeFile;
    const readFile = fs.promises.readFile;
    const fileNames = [];
    try{
        let fileName,fileStream,fullPath;
        await asyncForEach(files, async file => {
            if (file.path) {
                fileName = _getRandomId(5).concat(path.extname(file.name));
                
                fileStream = await readFile(file.path);
                fullPath = path.join(filePath,fileName);
                writeFile(fullPath,fileStream).catch(err=>{throw err});
                fileNames.push(fileName);
            }
        });
        return fileNames;
    }catch(err){
        throw await getError(err) 
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

/**
 * Delete files by fileNames
 * @param {String[]} fileNames 
 */
function deleteFiles(fileNames) {
    fileNames.forEach(fileName => {
        const filePath = path.join('.','uploads',fileName);
        fs.unlink(filePath,err=>console.log(err));
    })
}

const _getRandomId = size => uuid().slice(0,size);

module.exports = { saveFiles, deleteFiles }