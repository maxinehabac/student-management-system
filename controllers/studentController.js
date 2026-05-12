const Student = require('../models/Student');
const { validationResult } = require('express-validator');


// =========================
// DASHBOARD
// =========================
exports.home = (req, res) => {

    Student.getAllStudents((err, students) => {

        if (err) throw err;

        Student.countStudents((err2, countResult) => {

            if (err2) throw err2;

            const totalStudents = countResult[0].total;

            res.render('students/index', {
                students,
                totalStudents
            });
        });
    });
};


// =========================
// SHOW ADD FORM
// =========================
exports.showAddForm = (req, res) => {
    res.render('students/add');
};


// =========================
// ADD STUDENT (WITH IMAGE SUPPORT)
// =========================
exports.addStudent = (req, res) => {

    // validation check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/add');
    }

    const student = {
        name: req.body.name,
        course: req.body.course,
        age: req.body.age,

        // ✅ MULTER IMAGE HANDLING
        image: req.file ? req.file.filename : null
    };

    Student.addStudent(student, (err) => {

        if (err) {
            req.flash('error', 'Failed to add student');
            return res.redirect('/add');
        }

        req.flash('success', 'Student added successfully');
        res.redirect('/');
    });
};


// =========================
// SHOW EDIT FORM
// =========================
exports.showEditForm = (req, res) => {

    Student.getStudentById(req.params.id, (err, results) => {

        if (err) throw err;

        res.render('students/edit', {
            student: results[0]
        });
    });
};


// =========================
// UPDATE STUDENT
// =========================
exports.updateStudent = (req, res) => {

    const updatedStudent = {
        name: req.body.name,
        course: req.body.course,
        age: req.body.age
    };

    // ONLY add image if new file uploaded
    if (req.file) {
        updatedStudent.image = req.file.filename;
    }

    Student.updateStudent(req.params.id, updatedStudent, (err) => {

        if (err) {
            req.flash('error', 'Update failed');
            return res.redirect('/');
        }

        req.flash('success', 'Student updated successfully');
        res.redirect('/');
    });
};


// =========================
// DELETE STUDENT
// =========================
exports.deleteStudent = (req, res) => {

    Student.deleteStudent(req.params.id, (err) => {

        if (err) {
            req.flash('error', 'Delete failed');
            return res.redirect('/');
        }

        req.flash('success', 'Student deleted successfully');
        res.redirect('/');
    });
};