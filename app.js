require('dotenv').config();

const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const helmet = require('helmet');
const path = require('path');

require('./config/db');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();


// =========================
// SECURITY (Helmet)
// =========================
app.use(
    helmet({
        contentSecurityPolicy: false
    })
);


// =========================
// BODY PARSER
// =========================
app.use(express.urlencoded({ extended: true })); // cleaner than body-parser


// =========================
// STATIC FILES
// =========================
app.use(express.static(path.join(__dirname, 'public')));


// =========================
// SESSION
// =========================
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);


// =========================
// FLASH
// =========================
app.use(flash());


// =========================
// GLOBAL FLASH MIDDLEWARE
// =========================
app.use((req, res, next) => {
    const success = req.flash('success');
    const error = req.flash('error');

    res.locals.success = success.length ? success : null;
    res.locals.error = error.length ? error : null;

    next();
});


// =========================
// VIEW ENGINE
// =========================
app.set('view engine', 'ejs');


// =========================
// ROUTES
// =========================
app.use('/', authRoutes);
app.use('/', studentRoutes);


// =========================
// 404 HANDLER
// =========================
app.use((req, res) => {
    res.status(404).render('404');
});


// =========================
// SERVER
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});