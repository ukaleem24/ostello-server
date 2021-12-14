const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  

});

module.exports = mongoose.model('Booking', paymentSchema);
