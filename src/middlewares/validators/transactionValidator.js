import { body, check } from "express-validator";

const transactionValidator = {
  amountValidator: [
    body("amount")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Amount is required.")
      .isNumeric()
      .withMessage("Amount must be digits.")
      .isLength({ min: 3, max: 6 })
      .withMessage("You can only transfer within N100 to N900,000.")
  ],
  emailValidator: [
    check("beneficiaryEmail")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Email is required.")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address.")
  ],
  accountNumberValidator: [
    body("accountNumber")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Account Number is required.")
      .isNumeric()
      .withMessage("Account Number must be digits.")
      .isLength({ min: 10, max: 10 })
      .withMessage("Account Number must be 10 digits.")
  ],
  pinValidator: [
    body("pin")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Pin is required.")
      .isNumeric()
      .withMessage("Pin must be digits.")
      .isLength({ min: 4, max: 4 })
      .withMessage("Pin must be 4 digits.")
  ],
  OTPValidator: [
    body("OTP")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("OTP is required to complete this transaction.")
      .isNumeric()
      .withMessage("OTP must be digits.")
      .isLength({ min: 5, max: 5 })
      .withMessage("OTP must be 5 digits.")
  ]
};

export default transactionValidator;
