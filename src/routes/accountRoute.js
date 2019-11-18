import express from "express";
import AccountController from "../controllers/accountController";
import authenticate from "../middlewares/authentication";
import accountValidator from "../middlewares/validators/accountValidator";
import validate from "../middlewares/validators/validate";

const {
  balanceValidator,
  amountValidator,
  emailValidator,
} = accountValidator;

const router = express.Router();

router.post(
  "/create",
  balanceValidator,
  emailValidator,
  validate,
  authenticate,
  AccountController.createAccount
);

router.patch(
  "/credit",
  amountValidator,
  validate,
  authenticate,
  AccountController.creditAccount
)


router.get(
  "/accounts",
  authenticate,
  AccountController.viewUserAccount
);



export default router;
