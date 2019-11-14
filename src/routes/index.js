import express from "express";
import userRoute from "./userRoute";
import transactionRoute from "./transactionRoute";

const router = express.Router();

router.use("/user", userRoute);
router.use("/fund/", transactionRoute);

export default router;
