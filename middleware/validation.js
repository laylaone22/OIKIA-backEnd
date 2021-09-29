import { validationResult } from 'express-validator';
import createError from 'http-errors';

const checkValidationResults = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      throw createError(400, 'Validation failed', {
        details: errors
          .array()
          .map(({ param, msg }) => ({ field: param, message: msg })),
      });
    next();
  } catch (err) {
    next(err);
  }
};

const validateWith = (rules) => [...rules, checkValidationResults];

export default validateWith;
