const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


// =========================
// SHOW REGISTER
// =========================
exports.showRegister = (req, res) => {
    res.render('auth/register');
};


// =========================
// REGISTER USER
// =========================
exports.register = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/register');
    }

    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        };

        User.createUser(user, (err) => {

            if (err) {
                req.flash('error', 'Registration failed');
                return res.redirect('/register');
            }

            req.flash('success', 'Account created successfully');
            res.redirect('/login');
        });

    } catch (err) {
        req.flash('error', 'Something went wrong');
        res.redirect('/register');
    }
};


// =========================
// SHOW LOGIN
// =========================
exports.showLogin = (req, res) => {
    res.render('auth/login');
};


// =========================
// LOGIN USER
// =========================
exports.login = (req, res) => {

    User.findByEmail(req.body.email, async (err, results) => {

        if (err) {
            req.flash('error', 'Server error');
            return res.redirect('/login');
        }

        if (results.length === 0) {
            req.flash('error', 'User not found');
            return res.redirect('/login');
        }

        const user = results[0];

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            req.flash('error', 'Invalid password');
            return res.redirect('/login');
        }

        req.session.user = user;

        req.flash('success', 'Welcome back!');
        res.redirect('/');
    });
};


// =========================
// LOGOUT
// =========================
exports.logout = (req, res) => {

    req.session.destroy(() => {
        res.redirect('/login');
    });
};