const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  email: String,
  phone: Number,
  authorizationPin: String,
  password: String
});

module.exports = model("User", userSchema);
