const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userInfoSchema = new Schema({
  userId: Number,
  photo: String,
  dob: String,
  gender: String,
  city: String,
  nationality: String,
  occupation: String,
});

module.exports = mongoose.model('UserInfo', userInfoSchema);
