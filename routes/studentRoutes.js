const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');


// =========================
// DASHBOARD
// =========================
router.get('/', authMiddleware, studentController.home);


// =========================
// ADD FORM
// =========================
router.get('/add', authMiddleware, studentController.showAddForm);


// =========================
// ADD STUDENT (WITH IMAGE UPLOAD)
// =========================
router.post(
    '/add',
    authMiddleware,
    upload.single('image'), // ✅ IMPORTANT: enables multer

    [
        body('name').notEmpty().withMessage('Name is required'),
        body('course').notEmpty().withMessage('Course is required'),
        body('age').isNumeric().withMessage('Age must be a number')
    ],

    studentController.addStudent
);


// =========================
// EDIT FORM
// =========================
router.get('/edit/:id', authMiddleware, studentController.showEditForm);


// =========================
// UPDATE STUDENT
// =========================
router.post(
    '/edit/:id',
    authMiddleware,
    upload.single('image'),
    studentController.updateStudent
);


// =========================
// DELETE STUDENT
// =========================
router.get('/delete/:id', authMiddleware, studentController.deleteStudent);


module.exports = router;