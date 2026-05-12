const db = require('../config/db');

exports.createUser = (user, callback) => {

    db.query(
        'INSERT INTO users SET ?',
        user,
        callback
    );
};

exports.findByEmail = (email, callback) => {

    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        callback
    );
};