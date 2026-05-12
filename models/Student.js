const db = require('../config/db');

exports.getAllStudents = (callback) => {

    db.query(
        'SELECT * FROM students',
        callback
    );
};

exports.addStudent = (student, callback) => {

    db.query(
        'INSERT INTO students SET ?',
        student,
        callback
    );
};

exports.getStudentById = (id, callback) => {

    db.query(
        'SELECT * FROM students WHERE id = ?',
        [id],
        callback
    );
};

exports.updateStudent = (id, student, callback) => {

    db.query(
        'UPDATE students SET ? WHERE id = ?',
        [student, id],
        callback
    );
};

exports.deleteStudent = (id, callback) => {

    db.query(
        'DELETE FROM students WHERE id = ?',
        [id],
        callback
    );
};

exports.searchStudents = (keyword, callback) => {

    db.query(
        'SELECT * FROM students WHERE name LIKE ?',
        [`%${keyword}%`],
        callback
    );
};

exports.countStudents = (callback) => {

    db.query(
        'SELECT COUNT(*) AS total FROM students',
        (err, results) => {
            if (err) return callback(err, null);

            callback(null, results);
        }
    );
};