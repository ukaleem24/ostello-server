const router = require('express').Router();
const TestPhoto = require('../models/testPhoto');
const upload = require('../middlewares/upload-photo');
const path = require('path');

router.post('/test/photo/:userId', upload.any('photo'), async (req, res) => {
  try {
    let photoPaths = [];
    req.files.forEach((file) => {
      photoPaths.push(file.path);
    });
    console.log('photoPaths: ' + photoPaths);
    let testPhoto = new TestPhoto({
      photo: photoPaths,
      user: req.params.userId,
    });
    await testPhoto.save();

    res.json({
      success: true,
      message: 'Successfully saved a photo',
      testPhoto: testPhoto,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get('/test/get/photos/:userId', async (req, res) => {
  try {
    let photos = await TestPhoto.find({ user: req.params.userId }).populate(
      'user'
    );
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

router.get('/test/photo/:imageName', async (req, res) => {
  try {
    const dirname = path.resolve();
    console.log(req.params.imageName);
    res.sendFile(dirname + '\\images\\' + req.params.imageName);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
