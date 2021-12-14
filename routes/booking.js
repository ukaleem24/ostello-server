const router = require('express').Router();
const Booking = require('../models/booking');

// POST request

router.post('/new/booking', async (req, res) => {
  try {
    let booking = new Booking({
      landlord: req.body.landlordId,
      tenant: req.body.tenantId,
      listing: req.body.listingId,
      moveIn: req.body.moveIn,
      description: req.body.description,
      status: req.body.status,
      paymentStatus: req.body.payment,
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
router.get('/booking/details/landlord/:landlordId', async (req, res) => {
  try {
    let bookings = await Booking.find({
      landlord: req.params.landlordId,
    }).populate('listing tenant landlord');
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

router.get('/booking/details/tenant/:tenantId', async (req, res) => {
  try {
    let bookings = await Booking.find({
      tenant: req.params.tenantId,
    }).populate('listing tenant landlord');
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

router.get('/booking/details/:bookingId', async (req, res) => {
  try {
    let booking = await Booking.find({
      _id: req.params.bookingId,
    }).populate('listing tenant landlord');
    //sending response i.e status of the request and the data(products)
    res.json({
      success: true,
      booking: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.put('/booking/update/status/:id', async (req, res) => {
  try {
    let updateBookingStatus = await Booking.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
        },
      }
      // {
      //   upsert: true, // this will create a new entry if it didn't find an existing one
      // }
    );

    //sending response i.e status of the request and the updated product
    res.json({
      success: true,
      updatedBooking: updateBookingStatus,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
