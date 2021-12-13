const router = require('express').Router();
const Photo = require('../models/photo');
const upload = require('../middlewares/upload-photo');
const path = require('path');

router.post('/photo/:listingId', upload.any('photo'), async (req, res) => {
  try {
    let photoPaths = [];
    req.files.forEach((file) => {
      photoPaths.push(file.path);
    });

    let photo = new Photo({
      photo: photoPaths,
      listing: req.params.listingId,
    });
    await photo.save();

    res.json({
      success: true,
      message: 'Successfully saved a photo',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get('/get/photos/:listingId', async (req, res) => {
  try {
    let photos = await Photo.find({ listing: req.params.listingId });
    //sending response i.e status of the request and the data(products)
    res.json({
      success: true,
      photos: photos,
    });

    // const dirname = path.resolve();
    // res.sendFile(dirname + '\\images' + photos[0].photo[0]);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// router.get('/test/photo/:imageName', async (req, res) => {
//   try {
//     const dirname = path.resolve();
//     console.log(req.params.imageName);
//     res.sendFile(dirname + '\\images\\' + req.params.imageName);
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

module.exports = router;
