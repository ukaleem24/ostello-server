const router = require('express').Router();
const TemList = require('../models/temList');
const User = require('../models/user');

// POST request

router.post('/testing/listing', async (req, res) => {
  try {
    let list = new TemList({
      user: req.body.user,
      listName: req.body.listName,
    });

    await list.save();

    res.json({
      success: true,
      message: 'Successfully created a new TeampList',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get listing:
router.get('/testing/getlisting/:id', async (req, res) => {
  try {
    let listing = await TemList.find({ user: req.params.id }).populate('user');
    console.log(listing);
    //sending response i.e status of the request and the data(products)
    res.json({
      success: true,
      listing: listing,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});
module.exports = router;
