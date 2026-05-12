const db = require('../config/db');


// =========================
// CREATE USER
// =========================
exports.createUser = (user, callback) => {

    db.query(
        'INSERT INTO users SET ?',
        user,
        callback
    );
};


// =========================
// FIND USER BY EMAIL
// =========================
exports.findByEmail = (email, callback) => {

    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        callback
    );
};