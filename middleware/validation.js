import { validationResult } from 'express-validator';
import createError from 'http-errors';

// checkValidationResults uses validationResult() from express-validator to return an array of errors based on the validation rules in helpers/validation
const checkValidationResults = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            throw createError(400, 'Validation failed', {
                details: errors.array().map(({ param, msg }) => ({ field: param, message: msg }))
            });
        next();
    } catch (err) {
        next(err);
    }
};

// use validateWith in the signup route and the users/:id.put() to update user data
const validateWith = (rules) => [...rules, checkValidationResults];

export default validateWith;
