const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tempReview = new Schema({
  temList: { type: Schema.Types.ObjectId, ref: 'TemList' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  review: String,
  rating: Number,
});

module.exports = mongoose.model('TempReview', tempReview);
