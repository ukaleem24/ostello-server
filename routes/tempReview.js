const router = require('express').Router();
const TempReview = require('../models/tempReviews');

// POST request

router.post('/testing/review', async (req, res) => {
  try {
    let review = new TempReview({
      temList: req.body.temList,
      user: req.body.user,
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

//get listing:
router.get('/testing/review/:id', async (req, res) => {
  try {
    let reviews = await TempReview.findOne({ temList: req.params.id }).populate(
      'temList user'
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
