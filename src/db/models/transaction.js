const { Schema, model } = require('mongoose');

const transactionSchema = new Schema({
  amount: String,
  beneficiaryEmail: String,
  transactionDate: Date,
  pin: String,
  senderEmail: String,
  isVerified: Boolean,
  OTP: String
});

module.exports = model('Transaction', transactionSchema);