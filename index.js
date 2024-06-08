const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHndeler');
const connectDb = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const path = require('path');
const ejs = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: '01234',
    resave: false,
    saveUninitialized: true,
}));


// Routes
app.use('/employees', require('./routes/employeeRoutes'));
app.use('/', userRoutes);
app.use('/', require('./routes/router'));

// Error Handler
app.use(errorHandler);

// Set template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/javascript', express.static(path.resolve(__dirname, 'assets/javascript')));
app.use('/images', express.static(path.resolve(__dirname, 'assets/images')));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
});
