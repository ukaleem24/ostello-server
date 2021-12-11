const router = require('express').Router();
const Review = require('../models/review');

// POST request

router.post('/listingdetail/review', async (req, res) => {
  try {
    let review = new Review({
      user: req.body.user,
      listing: req.body.listing,
      title: req.body.title,
      review: req.body.review,
      rating: req.body.rating,
    });
    console.log(review);
    await review.save();

    res.json({
      success: true,
      message: 'Successfully created a new review',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get reviews:
router.get('/listingdetail/review/:id', async (req, res) => {
  try {
    let reviews = await Review.find({ listing: req.params.id }).populate(
      'user'
    );
    console.log(reviews);
    //sending response i.e status of the request and the data(products)
    res.json({
      success: true,
      reviews: reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
