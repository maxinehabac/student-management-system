require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

require('./config/db');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();


// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));


// STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));


// SESSION MIDDLEWARE
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


// FLASH MIDDLEWARE
app.use(flash());


// GLOBAL FLASH VARIABLES
app.use((req, res, next) => {

    res.locals.success = req.flash('success');

    res.locals.error = req.flash('error');

    next();
});


// VIEW ENGINE
app.set('view engine', 'ejs');


// ROUTES
app.use('/', authRoutes);

app.use('/', studentRoutes);

const helmet = require('helmet');

app.use(helmet());


// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use((req, res) => {

    res.status(404).render('404');
});