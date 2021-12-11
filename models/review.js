const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const review = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  listing: { type: Schema.Types.ObjectId, ref: 'ListingDetails' },
  title: String,
  review: String,
  rating: Number,
});

module.exports = mongoose.model('Review', review);
