import { body } from 'express-validator';

// validate name and email when posting new users
export const validationRulesPOST = [
    body('name').isAlpha().withMessage('Only letters allowed').trim().escape(),
    body('email').isEmail().withMessage('Not a valid e-mail address').trim().escape().normalizeEmail()
];

// same as POST but optional because users do not HAVE to update the fields
export const validationRulesPUT = [
    body('name').optional().isAlpha().withMessage('Only letters allowed').trim().escape(),
    body('email').optional().isEmail().withMessage('Not a valid e-mail address').trim().escape().normalizeEmail()
];
