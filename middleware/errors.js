import createError from 'http-errors';

export const handleErrors = (req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      message: err.message || 'Server Error 💩️',
      details: err.details || null,
    },
  });
};

export const throw404 = (req, res, next) => {
  // With http-errors, we can write less code, and do not need to remember status codes :)
  const newError = new createError.NotFound();
  next(newError);
};
