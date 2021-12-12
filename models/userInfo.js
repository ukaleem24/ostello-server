const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
<<<<<<< Updated upstream
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  photo:String,
=======
  userId: { type: Schema.Types.ObjectId, ref: 'Product' },
  photo: String,
>>>>>>> Stashed changes
  dob: String,
  gender: String,
  city: String,
  nationality: String,
  occupation: String,
});

module.exports = mongoose.model('UserInfo', userInfoSchema);
