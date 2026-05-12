const db = require('../config/db');


// =========================
// GET ALL STUDENTS
// =========================
exports.getAllStudents = (callback) => {

    db.query(
        'SELECT * FROM students',
        callback
    );
};


// =========================
// ADD STUDENT
// =========================
exports.addStudent = (student, callback) => {

    db.query(
        'INSERT INTO students SET ?',
        student,
        callback
    );
};


// =========================
// GET STUDENT BY ID
// =========================
exports.getStudentById = (id, callback) => {

    db.query(
        'SELECT * FROM students WHERE id = ?',
        [id],
        callback
    );
};


// =========================
// UPDATE STUDENT
// =========================
exports.updateStudent = (id, student, callback) => {

    db.query(
        'UPDATE students SET ? WHERE id = ?',
        [student, id],
        callback
    );
};


// =========================
// DELETE STUDENT
// =========================
exports.deleteStudent = (id, callback) => {

    db.query(
        'DELETE FROM students WHERE id = ?',
        [id],
        callback
    );
};


// =========================
// SEARCH STUDENTS
// =========================
exports.searchStudents = (keyword, callback) => {

    db.query(
        'SELECT * FROM students WHERE name LIKE ?',
        [`%${keyword}%`],
        callback
    );
};


// =========================
// COUNT STUDENTS
// =========================
exports.countStudents = (callback) => {

    db.query(
        'SELECT COUNT(*) AS total FROM students',
        (err, results) => {

            if (err) return callback(err, null);

            callback(null, results);
        }
    );
};