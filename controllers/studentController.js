const Student = require('../models/Student');

exports.home = (req, res) => {

    Student.getAllStudents((err, results) => {

        if (err) throw err;

        res.render('students/index', {
            students: results
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

        if (err) throw err;

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

            if (err) throw err;

            res.redirect('/');
        }
    );
};

exports.deleteStudent = (req, res) => {

    Student.deleteStudent(req.params.id, (err) => {

        if (err) throw err;

        res.redirect('/');
    });
};