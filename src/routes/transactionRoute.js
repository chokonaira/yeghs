import express from 'express';
import TransactionController from '../controllers/transactionController';
import authenticate from '../middlewares/authentication';
import transactionValidator from '../middlewares/validators/transactionValidator';
import validate from '../middlewares/validators/validate';


const { 
  amountValidator, 
  pinValidator,
  emailValidator,
  OTPValidator 
  } = transactionValidator;

const router = express.Router();

router.post('/transfer', 
        amountValidator, 
        pinValidator,
        emailValidator,
        validate,
        authenticate, 
        TransactionController.transferFund);

router.post('/transfer/verify', 
            OTPValidator,
            validate,
            authenticate, 
            TransactionController.verifyTransfer);

export default router;