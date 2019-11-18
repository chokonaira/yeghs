import { body, check } from "express-validator";

const accountValidator = {
  balanceValidator: [
    body("balance")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Balance is required.")
      .isNumeric()
      .withMessage("Balance must be digits.")
      .isLength({ min: 3, max: 6 })
      .withMessage("You can only transfer within N100 to N900,000.")
  ],
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
    check("holderEmail")
      .trim()
      .exists({ checkFalsy: true })
      .withMessage("Email is required.")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address.")
  ]
};

export default accountValidator;
