
const fs = require('fs');
const path = require('path');
const { uploadPath } = require('../config');
const { getError } = require('./errors');
const { getRandomCode } = require('./utils');

/**
 * Save given files to the disk
 * Return randomly generated filenames
 * 
 */
async function saveFiles() {
    const files = [...arguments];
    if (!files || !files.length) return [];
    const fileNames = [];
    try{
        let fileName;
        await asyncForEach(files, async file => {
            if (file.path) {
                fileName = await writeFile(file);
                fileNames.push(fileName);
            }
        });
        return fileNames.length > 1 ? fileNames : fileNames[0];
    }catch(err){
        throw await getError(err) 
    }
}

/**
 * Write given file to the disk
 * @param {File} file 
 */
async function writeFile(file) {
    const readFile = fs.promises.readFile;
    const writeFile = fs.promises.writeFile;
    let fileName = makeRandomFilename(file.name);
    try{
        let fileStream = await readFile(file.path);
        let fullPath = path.join(uploadPath,fileName);
        writeFile(fullPath,fileStream);
        return fileName;
    }catch(err){
        throw await getError(err);
    }
}

/**
 * Create a random fileName with the original extension
 * @param {String} orgName 
 */
function makeRandomFilename(orgName) {
    return getRandomCode(5).concat(path.extname(orgName))
}

/**
 * Util to handle asynchronous forEach
 * @param {*} array 
 * @param {Function} callback 
 */
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

/**
 * Delete files by fileNames
 * 
 */
async function deleteFiles() {
    fileNames = [...arguments]
    try{
        fileNames.forEach(fileName => {
            const filePath = path.join(uploadPath,fileName);
            fs.unlink(filePath,err=>console.log(err));
        })
    }catch(err){
        throw await getError(err);
    }
}

async function getFilePath(fileName) {
    try{
        const fullPath = path.join(uploadPath,fileName);
        await fs.promises.access(fullPath)
        return fullPath;
    }catch(err) {
        throw await getError(err);
    }
    
}

module.exports = { saveFiles, deleteFiles, getFilePath }