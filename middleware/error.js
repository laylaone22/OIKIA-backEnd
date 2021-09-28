export const errorHandler = (error, req, res, next) => {
  const code = error.status;
  res.status(code).send(error);
};
