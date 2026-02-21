const User = require('../models/user')

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");


// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    console.log('**** start isAuthenticatedUser middleware ****');
    
    let token = req.headers["x-access-token"];
    console.log('token:', token);

    if (!token) {
        // return res.status(401).send(new ErrorHandler('Login first to access this resource.', 401));
        return res.status(401).send('Login first to access this resource.');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);
    console.log(`authenticated user : ${JSON.stringify(req.user)}`);
    
    next();
})

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403))
        }
        next()
    }
}