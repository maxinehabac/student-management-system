const multer = require('multer');
const path = require('path');


// =========================
// STORAGE CONFIG
// =========================
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'));
    },

    filename: (req, file, cb) => {

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});


// =========================
// FILE FILTER (OPTIONAL SAFETY)
// =========================
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);

    if (ext && mime) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};


// =========================
// EXPORT MULTER
// =========================
module.exports = multer({
    storage,
    fileFilter
});