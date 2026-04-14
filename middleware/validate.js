const { body, validationResult } = require('express-validator');

const programRules = () => {
  return [
    body('programName').notEmpty().withMessage('Program name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive number'),
    body('level').isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid difficulty level'),
    body('focusArea').notEmpty().withMessage('Focus area is required'),
    body('trainerName').notEmpty().withMessage('Trainer name is required'), 
    body('isPublic').isBoolean().withMessage('isPublic must be a boolean'), 
    body('tags').isArray().withMessage('Tags must be an array')             
  ];
};

const userRules = () => {
  return [
    body('email').isEmail().withMessage('A valid email is required'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = { programRules, userRules, validate };