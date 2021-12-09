const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const temList = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  listing: { type: Schema.Types.ObjectId, ref: 'User' },
  review: String,
  rating: String,
});

module.exports = mongoose.model('TemList', temList);
