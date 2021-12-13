const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  landlord: { type: Schema.Types.ObjectId, ref: 'User' },
  tenant: { type: Schema.Types.ObjectId, ref: 'User' },
  listing: { type: Schema.Types.ObjectId, ref: 'ListingDetails' },
  moveIn: String,
  desciption: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
