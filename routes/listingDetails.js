const router = require('express').Router();
const { Schema } = require('mongoose');
const ListingDetails = require('../models/listingDetails');

router.post('/add/listing', async (req, res) => {
  try {
    let listingDetails = new ListingDetails({
      kind: req.body.kind,
      type: req.body.type,
      streetAddress: req.body.streetAddress,
      location: req.body.location,
      city: req.body.city,
      country: req.body.country,
      phone: req.body.phone,
      rentalPeriod: req.body.rentalPeriod,
      availableFrom: req.body.availableFrom,
      price: req.body.price,
      currency: req.body.currency,
      description: req.body.description,
      bed: req.body.bed,
      wifi: req.body.wifi,
      washingMachine: req.body.washingMachine,
      dryer: req.body.dryer,
      tv: req.body.tv,
      airConditioner: req.body.airConditioner,
      balcony: req.body.balcony,
      garden: req.body.garden,
      pets: req.body.pets,
      parking: req.body.parking,
      basement: req.body.basement,
      furnished: req.body.furnished,
      averageRating: req.body.averageRating,
    });
    console.log('Listing Details');

    await listingDetails.save();

    res.json({
      status: true,
      message: 'Successfully created a new Listing',
      info: listingDetails,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
