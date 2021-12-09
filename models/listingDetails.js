const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  kind: String,
  type: String,
  streetAddress: String,
  location: String,
  city: String,
  country: String,
  phone: String,
  rentalPeriod: String,
  availableFrom: String,
  price: String,
  currency: String,
  description: String,
  bed: String,
  wifi: String,
  washingMachine: String,
  dryer: String,
  tv: String,
  airConditioner: String,
  balcony: String,
  garden: String,
  pets: String,
  parking: String,
  basement: String,
  furnished: String,
  averageRating: Number,
  position: Object,
});

module.exports = mongoose.model('ListingDetails', listingSchema);
