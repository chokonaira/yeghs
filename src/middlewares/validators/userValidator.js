import { body, check } from 'express-validator';

const userValidator = {
  passwordValidator: [
    body('password')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Password is required.')
      .isLength({ min: 5, max: 10 })
      .withMessage('Password must be between 5 to 10 characters long.')
      .isAlphanumeric()
      .withMessage('Password must be alphanumeric.'),
  ],
  phoneValidator: [
    body('phone')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Phone number is required.')
      .isNumeric()
      .withMessage('Phone number must be numeric.')
      .isLength({ min: 13, max: 13 })
      .withMessage('Phone number must be 13 digits starting with country code, eg: 234.'),
  ],
  emailValidator: [
    check('email')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Email is required.')
      .isEmail()
      .normalizeEmail()
      .withMessage('Invalid email address.'),
  ],
  usernameValidator: [
    body('username')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('Username is required.')
      .matches(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/)
      .withMessage('Invalid username.')
      .isLength({ min: 5, max: 10 })
      .withMessage('Username must be between 5 and 10 characters.'),
  ],
};

export default userValidator;
