import express from "express";
import TransactionController from "../controllers/transactionController";
import authenticate from "../middlewares/authentication";
import transactionValidator from "../middlewares/validators/transactionValidator";
import validate from "../middlewares/validators/validate";

const {
  amountValidator,
  pinValidator,
  emailValidator,
  accountNumberValidator,
  OTPValidator
} = transactionValidator;

const router = express.Router();

router.post(
  "/transfer",
  amountValidator,
  accountNumberValidator,
  pinValidator,
  emailValidator,
  validate,
  authenticate,
  TransactionController.transferFund
);

router.post(
  "/transfer/verify",
  OTPValidator,
  validate,
  authenticate,
  TransactionController.verifyTransfer
);

router.get(
  "/transfer/completed",
  authenticate,
  TransactionController.getAllUserTransactions
);

export default router;
