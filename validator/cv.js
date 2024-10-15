const { body, validationResult } = require('express-validator');

const validateCV = [
    body('name').notEmpty().withMessage('Name is required'),
    body('surname').notEmpty().withMessage('Surname is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('education').isArray().withMessage('Education must be an array'),
    body('education.*.degree').notEmpty().withMessage('Degree is required'),
    body('education.*.institution').notEmpty().withMessage('Institution is required'),
    body('education.*.year').isNumeric().withMessage('Year must be a number'),
    body('experience').isArray().withMessage('Experience must be an array'),
    body('experience.*.title').notEmpty().withMessage('Title is required'),
    body('experience.*.company').notEmpty().withMessage('Company is required'),
    body('experience.*.year').isNumeric().withMessage('Year must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateCV };
