# async

if we are using mongoose and the methods that we are using like create and findById and others will return a promise so for that reason we need to use async with controller functions so we can await the promise instead of using the try and catch methods. The async will also help us to use custome error handlers.

# asyncHandler package

asyncHandler will allow use to use our custom error handler easily and not wrapping everything with try and catch, we can wrapp or async controller function in asynHandler after installing it by using npm i express-async-handler.

### example:

import asyncHandler from "express-async-handler";

// @desc Auth user/set token
// route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
res.status(200).json({ message: "Auth User" });
});

export { authUser };

# middleware

in the backend, we need to create a folder called middleware where we can put or middleware files like errorMiddleware for catching errors.

# errorMiddleware

as the default middleware for express is an html page, and if we create an api, we may create json error object and a stackTrace if we are in the development mode.

we need to create two middleware functions in this: first one will be used as a catch off for routes that don't exits such as going to a wrong route that is not defined. The second one will be used as a catch off for errors in our routes that occurs.

### example:

const notFound = (req, res, next) => {
const error = new Error(`Not found - ${req.originalUrl}`);

res.status(404);
next(error);
};

const errorHandler = (err, req, res, next) => {
// if we are throwing a manaual error, then the status may still be 200, then we have to check it, if it's 200 then we have to change to 500 otherwise leave it as whatever it is if it's not 200.
let statusCode = res.statusCode === 200 ? 500 : res.satusCode;

let message = err.message;

// we can also check for a castError which is if a user doesn't exist with an id and it doesn't exits, then throws off. so we have to check for it.
if (err.name === "CastError" && err.kind === "ObjectId") {
statusCode = 404;
message = "Resource not found";
}

res.status(statusCode).json({
message,

    // err.stack allows to see line numbers and other details regarding the error if we are in development mode.
    stack: process.env.NODE_ENV === "production" ? null : err.stack,

});
};

export { notFound, errorHandler };

and then we can import them and use them at the bottom of the app.as or server.js

### example:

app.use(notFound);
app.use(errorHandler);
