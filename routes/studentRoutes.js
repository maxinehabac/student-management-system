const express = require('express');

const router = express.Router();

const studentController = require('../controllers/studentController');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, studentController.home);

router.get('/add', authMiddleware, studentController.showAddForm);

router.post('/add', authMiddleware, studentController.addStudent);

router.get('/edit/:id', authMiddleware, studentController.showEditForm);

router.post('/edit/:id', authMiddleware, studentController.updateStudent);

router.get('/delete/:id', authMiddleware, studentController.deleteStudent);

module.exports = router;