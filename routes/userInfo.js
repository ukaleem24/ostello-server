const router = require('express').Router();
const UserInfo = require('../models/userInfo');
const upload = require('../middlewares/upload-photo');

// POST request

router.post('/user/info', upload.single('photo'), async (req, res) => {
  try {
    let userInfo = new UserInfo({
      userId: req.body.userId,
      photo: req.file.path,
      dob: req.body.dob,
      gender: req.body.gender,
      city: req.body.city,
      nationality: req.body.nationality,
      occupation: req.body.occupation,
    });
    // console.log('here');
    // console.log(req.files);

    // if (req.files) {
    //   let path = '';
    //   req.files.forEach(function (files, index, arr) {
    //     path = path + files.path + ',';
    //   });
    //   path = path.substring(0, path.lastIndexOf(','));
    //   userInfo.photo = path;
    // }

    await userInfo.save();

    res.json({
      success: true,
      message: 'Successfully created a new UserInfo',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// // GET request - to get all the owner

// router.get('/owners', async (req, res) => {
//   try {
//     let owners = await Owner.find();

//     res.json({
//       success: true,
//       owners: owners,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// //

// GET request- get only a single product

router.get('/user/info/:id', async (req, res) => {
  try {
    let userinfo = await UserInfo.findOne({ userId: req.params.id });

    //sending response i.e status of the request and the data
    res.json({
      success: true,
      userinfo: userinfo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// // PUT request- Update a single product

// router.put('/owners/:id', upload.single('photo'), async (req, res) => {
//   try {
//     let updatedOwner = await Owner.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           name: req.body.name,
//           about: req.body.about,
//           photo: req.file.path,
//         },
//       },
//       {
//         upsert: true, // this will create a new entry if it didn't find an existing one
//       }
//     );

//     //sending response i.e status of the request and the updated product
//     res.json({
//       success: true,
//       updatedOwner: updatedOwner,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

// // DELETE request- delete a single request

// router.delete('/owners/:id', async (req, res) => {
//   try {
//     let deletedOwner = await Owner.findOneAndDelete({ _id: req.params.id });
//     if (deletedOwner) {
//       res.json({
//         status: true,
//         message: 'Owner deleted successfully',
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });
module.exports = router;
