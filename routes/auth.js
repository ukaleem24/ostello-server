const router = require('express').Router();
const User = require('../models/user');

const jwt = require('jsonwebtoken');
// const { response } = require("express");
const verifyToken = require('../middlewares/verify-token');

// signup route

router.post('/auth/signup', async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(403).json({
      success: false,
      message: 'Please enter valid email and password',
    });
  } else {
    // chechk whether email is already registered or not
    const foundUser = await User.findOne({ email: req.body.email });
    // if not found sign up
    if (!foundUser) {
      try {
        let newUser = new User({
          fName: req.body.fName,
          lName: req.body.lName,
          email: req.body.email,
          password: req.body.password,
        });

        await newUser.save();

        // let token = jwt.sign(newUser.toJSON(), process.env.ENCRYPTION_KEY, {
        //   expiresIn: 604800, // 1 week
        // });

        res.json({
          success: true,
          // token: token,
          message: 'Successfully created a new User',
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: 'Email already exists!!!',
      });
    }
  }
});

// Profile Route

router.get('/auth/user', async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.decoded._id });
    if (user) {
      res.json({
        success: true,
        user: user,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//get all Users
{
  router.get('/auth/allusers', async (req, res) => {
    try {
      let users = await User.find();
      if (users) {
        res.json({
          success: true,
          users: users,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  });
}
// Update a Profile

router.put('/owners/:id', async (req, res) => {
  try {
    let updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          fName: req.body.fName,
          lName: req.body.lName,
        },
      },
      {
        upsert: true, // this will create a new entry if it didn't find an existing one
      }
    );
    //sending response i.e status of the request and the updated product
    res.json({
      success: true,
      updatedUser: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Login route

router.post('/auth/login', async (req, res) => {
  try {
    let foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      res.status(403).json({
        success: false,
        message: 'Authentication failed, user not found',
      });
    } else {
      if (foundUser.comparePassword(req.body.password)) {
        let token = jwt.sign(foundUser.toJSON(), process.env.ENCRYPTION_KEY, {
          expiresIn: 604800,
        });
        res.json({
          success: true,
          token: token,
          user: foundUser,
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Authentication Failed, wrong password',
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
