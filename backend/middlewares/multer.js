// const multer = require('multer');
// const path = require('path');


// global.__basedir = __dirname;
// const appDir = path.dirname(require.main.filename);
// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, appDir + '/uploads');
//     },
//     filename(req, file, cb) {
//         cb(null, `${file.fieldname}-${Date.now()}`)
//     }
// });

// const max_upload_size = 50 * 1024 * 1024;
// const upload = multer({
//     storage,
//     limits: {
//         fileSize: max_upload_size
//     }
// });

// module.exports = upload;
const util = require("util");
const Multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;