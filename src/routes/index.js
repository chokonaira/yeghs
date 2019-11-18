import express from "express";
import userRoute from "./userRoute";
import transactionRoute from "./transactionRoute";
import accountRoute from './accountRoute';

const router = express.Router();

router.use("/user", userRoute);
router.use("/account", accountRoute);
router.use("/fund", transactionRoute);

export default router;
