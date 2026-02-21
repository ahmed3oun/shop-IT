const express = require('express');
const cors = require('cors');
const app = express();

// const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
const path = require('path')

const errorMiddleware = require('./middlewares/errors')

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json());
// app.use(cookieParser())
app.use(
    cookieSession({
        // signed: false,
        keys: [process.env.COOKIE_SECRET],
        // expires: process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000, // Convert days to milliseconds
        // secure: process.env.NODE_ENV !== 'test', // Use secure cookies in production
        // secure: false, // Use secure cookies in production
        httpOnly: true, // Prevent client-side JS from accessing the cookie
        // sameSite: 'strict', // Prevent CSRF attacks
    })
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});


// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');
const category = require('./routes/category');

app.use('/api/v1/', auth)
app.use('/api/v1/', products)
app.use('/api/v1/', payment)
app.use('/api/v1/', order)
app.use('/api/v1/', category);



if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}


// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app