const multer = require('multer');

/*const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../SERVER/Storage/IMAGES');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage: fileStorageEngine});*/

const upload = multer({storage:multer.memoryStorage()});

module.exports = upload;