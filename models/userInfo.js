const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Product' },
  photo:String,
  dob: String,
  gender: String,
  city: String,
  nationality: String,
  occupation: String,
});

module.exports = mongoose.model('UserInfo', userInfoSchema);
