import Transaction from "../db/models/transaction";
import Cryptr from "cryptr";

const cryptr = new Cryptr("myTotalySecretKey");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const from = process.env.TWILLO_NUMBER;
const client = require("twilio")(accountSid, authToken);

class TransactionController {
  static async transferFund(req, res) {
    try {
      const { amount, beneficiaryEmail, pin } = req.body;
      const { email, phone, authorizationPin } = req.authUser;
      const decryptedpin = cryptr.decrypt(authorizationPin);
      const transactionDate = Date.now();
      const isVerified = false;
      const OTP = Math.floor(Math.random() * 90000) + 10000;
      const value = {
        amount,
        beneficiaryEmail,
        authorizationPin,
        transactionDate,
        isVerified,
        email,
        OTP
      };

      if (email) {
        if (pin === decryptedpin) {
          const transaction = new Transaction(value);
          transaction.save();
          const text = `Here\'s an OTP: ${OTP} to complete your transaction`;

          client.messages
            .create({
              body: text,
              from,
              to: `+${phone}`
            })
            .then(() => console.log("success"))
            .catch(e => console.log("error", e));
          return res.status(201).json({
            status: 201,
            message:
              "Please check you phone number for an OTP to complete transaction"
          });
        } else {
          return res.status(201).json({
            status: 201,
            message: "Aunthorised, Pin incorrect"
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
  static async verifyTransfer(req, res) {
    try {
      const { OTP } = req.body;
      const pendingTransaction = await Transaction.findOne({
        OTP,
        isVerified: false
      });

      if (pendingTransaction) {
        const { _id } = pendingTransaction;
        await Transaction.updateOne({ _id }, { isVerified: true });

        return res.status(200).json({
          status: 200,
          message: "Transaction completed succcesfully"
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Transaction error: Invalid OTP, please check and try again"
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}
export default TransactionController;
