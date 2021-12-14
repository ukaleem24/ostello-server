const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  cardholder: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Booking', paymentSchema);
