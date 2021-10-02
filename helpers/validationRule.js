import { body, sanitizeBody } from 'express-validator';

export const validationRulesPOST = [
    body('email').isEmail().withMessage('Not a valid e-mail address').trim().escape().normalizeEmail(),
    body('firstName').isAlpha().withMessage('Only letters allowed').trim().escape(),
    body('lastName').isAlpha().withMessage('Only letters allowed').trim().escape()
];

export const validationRulesPUT = [];
