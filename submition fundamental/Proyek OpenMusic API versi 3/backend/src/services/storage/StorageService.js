const fs = require('fs');

class StorageService {
  constructor(folder){
    this._folder = folder;
    if (!fs.existsSync(folder)) { // if folder not exist create folder
      fs.mkdirSync(folder, { recursive: true });
    }

  }

  writeFile(file, attrFile){
    const filename = +new Date() + attrFile.filename;
    const path = `${this._folder}/${filename}`;
    const fileStream = fs.createWriteStream(path);
    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }

  deleteFile(filename){
    const path = `${this._folder}/${filename}`;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }
}
module.exports = StorageService;