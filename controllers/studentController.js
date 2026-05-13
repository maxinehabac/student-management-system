const Student = require('../models/Student');
const { validationResult } = require('express-validator');

const fs = require('fs');
const path = require('path');


// =========================
// DASHBOARD + SEARCH
// =========================
exports.home = (req, res) => {

    const keyword = req.query.search;

    // SEARCH STUDENT
    if (keyword) {

        Student.searchStudents(keyword, (err, students) => {

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
    }

    // NORMAL DASHBOARD
    else {

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
    }
};


// =========================
// SHOW ADD FORM
// =========================
exports.showAddForm = (req, res) => {
    res.render('students/add');
};


// =========================
// ADD STUDENT
// =========================
exports.addStudent = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        req.flash('error', errors.array()[0].msg);
        return res.redirect('/add');
    }

    const student = {
        name: req.body.name,
        course: req.body.course,
        age: req.body.age,
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

    Student.getStudentById(req.params.id, (err, results) => {

        if (err || results.length === 0) {

            req.flash('error', 'Student not found');
            return res.redirect('/');
        }

        const oldStudent = results[0];

        const updatedStudent = {
            name: req.body.name,
            course: req.body.course,
            age: req.body.age
        };

        // NEW IMAGE UPLOADED
        if (req.file) {

            updatedStudent.image = req.file.filename;

            // DELETE OLD IMAGE
            if (oldStudent.image) {

                const oldImagePath = path.join(
                    __dirname,
                    '../public/uploads',
                    oldStudent.image
                );

                if (fs.existsSync(oldImagePath)) {

                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        Student.updateStudent(req.params.id, updatedStudent, (err2) => {

            if (err2) {

                req.flash('error', 'Update failed');
                return res.redirect('/');
            }

            req.flash('success', 'Student updated successfully');
            res.redirect('/');
        });
    });
};


// =========================
// DELETE STUDENT
// =========================
exports.deleteStudent = (req, res) => {

    // GET STUDENT FIRST
    Student.getStudentById(req.params.id, (err, results) => {

        if (err || results.length === 0) {

            req.flash('error', 'Student not found');
            return res.redirect('/');
        }

        const student = results[0];

        // DELETE IMAGE IF EXISTS
        if (student.image) {

            const imagePath = path.join(
                __dirname,
                '../public/uploads',
                student.image
            );

            // CHECK IF FILE EXISTS
            if (fs.existsSync(imagePath)) {

                fs.unlinkSync(imagePath);
            }
        }

        // DELETE STUDENT FROM DATABASE
        Student.deleteStudent(req.params.id, (err2) => {

            if (err2) {

                req.flash('error', 'Delete failed');
                return res.redirect('/');
            }

            req.flash('success', 'Student deleted successfully');
            res.redirect('/');
        });
    });
};