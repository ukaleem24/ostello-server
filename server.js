const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

//connecing to the database
mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },

  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to the database');
    }
  }
);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// require APIs

const userRoutes = require('./routes/auth');
const userInfoRoutes = require('./routes/userInfo');
const listingDetails = require('./routes/listingDetails');
const temListRoutes = require('./routes/temList');
const reviewRoutes = require('./routes/review');
const bookingRoutes = require('./routes/review');

app.use('/api', userRoutes);
app.use('/api', userInfoRoutes);
app.use('/api', listingDetails);

app.use('/api', temListRoutes);
app.use('/api', reviewRoutes);

// making images folder publically available

app.use('/images', express.static('images'));
// app.use(express.static("./images"));

// Server listening on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
