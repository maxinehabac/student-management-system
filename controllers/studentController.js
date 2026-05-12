const Student = require('../models/Student');

exports.home = (req, res) => {

    Student.getAllStudents((err, students) => {

        if (err) throw err;

        // STEP 1: get total count inside callback chain
        Student.countStudents((err2, countResult) => {

            if (err2) throw err2;

            const totalStudents = countResult[0].total;

            // STEP 2: pass BOTH values to EJS
            res.render('students/index', {
                students: students,
                totalStudents: totalStudents
            });
        });

    });
};

exports.showAddForm = (req, res) => {
    res.render('students/add');
};

exports.addStudent = (req, res) => {

    const student = {
        name: req.body.name,
        course: req.body.course,
        age: req.body.age
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

exports.showEditForm = (req, res) => {

    Student.getStudentById(req.params.id, (err, results) => {

        if (err) throw err;

        res.render('students/edit', {
            student: results[0]
        });
    });
};

exports.updateStudent = (req, res) => {

    const updatedStudent = {
        name: req.body.name,
        course: req.body.course,
        age: req.body.age
    };

    Student.updateStudent(
        req.params.id,
        updatedStudent,
        (err) => {

            if (err) {

                req.flash('error', 'Update failed');

                return res.redirect('/');
            }

            req.flash('success', 'Student updated successfully');

            res.redirect('/');
        }
    );
};

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