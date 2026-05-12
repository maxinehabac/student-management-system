const User = require('../models/User');

const bcrypt = require('bcryptjs');

exports.showRegister = (req, res) => {
    res.render('auth/register');
};

exports.register = async (req, res) => {

    const hashedPassword = await bcrypt.hash(
        req.body.password,
        10
    );

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    };

    User.createUser(user, (err) => {

        if (err) throw err;

        res.redirect('/login');
    });
};

exports.showLogin = (req, res) => {
    res.render('auth/login');
};

exports.login = (req, res) => {

    User.findByEmail(req.body.email, async (err, results) => {

        if (err) throw err;

        if (results.length === 0) {
            return res.send('User not found');
        }

        const user = results[0];

        const match = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!match) {
            return res.send('Invalid Password');
        }

        req.session.user = user;

        res.redirect('/');
    });
};

exports.logout = (req, res) => {

    req.session.destroy();

    res.redirect('/login');
};