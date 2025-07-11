const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);

  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // if we are throwing a manaual error, then the status may still be 200, then we have to check it, if it's 200 then we have to change to 500 otherwise leave it as whatever it is if it's not 200.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

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
