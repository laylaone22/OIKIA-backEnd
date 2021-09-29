import { body, sanitizeBody } from 'express-validator';

export const validationRulesPOST = [
  body('email')
    .isEmail()
    .withMessage('Not a valid e-mail address')
    .trim()
    .escape()
    .normalizeEmail(),
  body('firstName')
    .isAlpha()
    .withMessage('Only letters allowed')
    .trim()
    .escape(),
  body('lastName')
    .isAlpha()
    .withMessage('Only letters allowed')
    .trim()
    .escape(),
  body('alias')
    .optional()
    .matches(/^[A-Za-z0-9]{4,15}$/)
    .withMessage('Alias must be between 7 and 18 characters long')
    .trim()
    .escape(),
];
