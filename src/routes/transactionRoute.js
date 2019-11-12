import express from 'express';
import TransactionController from '../controllers/transactionController';
import authenticate from '../middlewares/authentication';

const router = express.Router();

router.post('/transfer', authenticate, TransactionController.transferFund);

export default router;