const router = require('express').Router();
const { Schema } = require('mongoose');
const ListingDetails = require('../models/listingDetails');

router.post('/add/listing', async (req, res) => {
  try {
    let listingDetails = new ListingDetails({
      user: req.body.userId,
      kind: req.body.kind,
      type: req.body.type,
      streetAddress: req.body.streetAddress,
      location: req.body.location,
      city: req.body.city.toLowerCase(),
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
      position: req.body.position,
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

router.get('/listings/:userId', async (req, res) => {
  try {
    let searchResults = await ListingDetails.find({
      user: req.params.userId,
    });

    //sending response i.e status of the request and the data(products)
    res.json({
      success: true,
      searchResults: searchResults,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'not found',
    });
  }
});

router.get('/search/listings/:searchQuery', async (req, res) => {
  try {
    let searchResults = await ListingDetails.find({
      city: req.params.searchQuery.toLowerCase(),
    });

    //sending response i.e status of the request and the data(products)
    res.json({
      success: true,
      searchResults: searchResults,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get(
  '/search/filter/listings/:searchQuery/:category',
  async (req, res) => {
    try {
      let searchResults;
      if (req.params.category === 'all') {
        searchResults = await ListingDetails.find({
          city: req.params.searchQuery.toLowerCase(),
        });
      } else {
        searchResults = await ListingDetails.find({
          city: req.params.searchQuery.toLowerCase(),
          type: String(req.params.category),
        });
      }

      //sending response i.e status of the request and the data(products)
      res.json({
        success: true,
        searchResults: searchResults,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

//getting all listings
router.get('/all/listings/', async (req, res) => {
  try {
    let searchResults = await ListingDetails.find();

    //sending response i.e status of the request and the data(products)
    res.json({
      success: true,
      listings: searchResults,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.get('/search/specific_listing/:searchQuery', async (req, res) => {
  try {
    let searchResults = await ListingDetails.find({
      _id: req.params.searchQuery,
    }).populate('user');

    //sending response i.e status of the request and the data(products)
    res.json({
      success: true,
      searchResults: searchResults,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
router.delete('/delete/listing/:id', async (req, res) => {
  try {
    let deletedListing = await ListingDetails.findOneAndDelete({
      _id: req.params.id,
    });
    if (deletedListing) {
      res.json({
        status: true,
        message: 'Listing deleted successfully',
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
module.exports = router;
