const { Schema, model } = require("mongoose");

const accountSchema = new Schema({
  accountNumber: String,
  holderEmail: String,
  phone: String,
  BVN: String,
  balance: Number,
  createdAt: Date,
  updatedAt: Date
});

module.exports = model("Account", accountSchema);
