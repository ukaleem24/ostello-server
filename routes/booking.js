const router = require('express').Router();
const Booking = require('../models/booking');

// POST request

router.post('/booking', async (req, res) => {
  try {
    let booking = new Booking({
      lanlord: req.body.landlord,
      tenant: req.body.tenant,
      listing: req.body.listing,
      moveIn: req.body.moveIn,
      moveOut: req.body.moveOut,
    });
    await booking.save();

    res.json({
      success: true,
      message: 'Successfully created a new booking',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get booked properties  of a specific landlord:
router.get('//booking/detail:id', async (req, res) => {
  try {
    let bookings = await Booking.find({ landlord: req.params.id }).populate(
      'listing tenant'
    );
    //sending response i.e status of the request and the data(products)
    res.json({
      success: true,
      bookings: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;