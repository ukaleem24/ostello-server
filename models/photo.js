const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photo = new Schema({
  listing: { type: Schema.Types.ObjectId, ref: 'ListingDetails' },
  photo: [],
});

module.exports = mongoose.model('Photo', photo);
