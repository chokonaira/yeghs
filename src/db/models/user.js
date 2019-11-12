const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  phone: Number,
  password: String,
});

module.exports = model('User', userSchema);