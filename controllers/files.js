
const fs = require('fs');
const path = require('path');
const { uploadPath, defaultPrefix } = require('../config');
const { getError } = require('./errors');
const { getRandomCode } = require('./utils');
const { NotFoundError } = require('./errors');
const cloudinary = require('cloudinary').v2;

const uploadOptions = {
    use_filename: false,
    folder: 'cafe-rio',
}

cloudinary.config({
    cloud_name: "skyimages",
    api_key:"369875593241412",
    api_secret:"RUYPNwOSTU3JwqOfdS2mDnMzo-c",
});

function uploadToCloudinary(image) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, uploadOptions, (err, result) => {
        if (err) return reject(err);
        return resolve(result.url);
      })
    });
  }

function getPublicIdFromUrl(url) {
    const publicId = url
    .split('/')
    .slice(-1)[0]
    .split('.')[0];
    return uploadOptions.folder ? uploadOptions.folder.concat('/',publicId) : publicId;
}

/**
 * Delete image from cloudinary
 * unless it's the default image
 * @param {String} imageUrl 
 */
function deleteFromCloudinary(imageUrl) {
    const publicId = getPublicIdFromUrl(imageUrl);
    console.log(publicId);
    if (!publicId.includes(defaultPrefix)) {
        cloudinary.uploader.destroy(getPublicIdFromUrl(imageUrl),()=>console.log('deleted'));
    }
}

async function saveFiles() {
    const files = [...arguments];
    if (!files || !files[0]) return [];
    const fileNames = [];
    try{
        let fileName;
        await asyncForEach(files, async file => {
            fileName = await uploadToCloudinary(file.path);
            fileNames.push(fileName);
        });
        return fileNames.length > 1 ? fileNames : fileNames[0];
    }catch(err){
        throw await getError(err) 
    }
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
 * Delete files by file urls
 */
async function deleteFiles() {
    fileUrls = [...arguments]
    if (!fileUrls || !fileUrls[0]) return;
    try{
        fileUrls.forEach(async url => {
            deleteFromCloudinary(url);
        });
    }catch(err){
        throw await getError(err);
    }
}

/**
 * Given valid filenName, return the full file path
 * @param {String} fileName 
 */
async function getFilePath(fileName) {
    try{
        const fullPath = path.join(uploadPath,fileName);
        await fs.promises.access(fullPath)
        return fullPath;
    }catch(err) {
        throw new NotFoundError('file'); 
    }
    
}

module.exports = { saveFiles, deleteFiles, getFilePath }