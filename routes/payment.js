const router = require('express').Router();
// const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const Order = require('../models/order');
const Booking = require('../models/booking');
// const SHIPMENT = {
//   normal: {
//     price: 13.98,
//     days: 7,
//   },
//   fast: {
//     price: 49.98,
//     days: 3,
//   },
// };

// function shipmentPrice(shipmentOption) {
//   let estimated = moment().add(shipmentOption.days, 'd').format('dddd MMMM Do');
//   return {
//     estimated,
//     price: shipmentOption.price,
//   };
// }

// router.post('/shipment', (req, res) => {
//   let shipment = '';

//   if (req.body.shipment === 'normal') {
//     shipment = shipmentPrice(SHIPMENT.normal);
//   } else {
//     shipment = shipmentPrice(SHIPMENT.fast);
//   }

//   res.json({
//     success: true,
//     shipment: shipment,
//   });
// });

router.post('/payment', async (req, res) => {
  let totalPrice = Math.round(req.body.totalPrice * 100);
  console.log(req);
  stripe.customers
    .create({
      email: req.body.email,
      name: req.body.name,
    })
    .then((customer) => {
      return stripe.customers.createSource(customer.id, {
        source: 'tok_visa',
      });
    })
    .then((source) => {
      return stripe.charges
        .create({
          amount: totalPrice,
          currency: 'pkr',
          customer: source.customer,
        })
        .catch((msg) => {
          console.log('inside catch' + msg);
        });
    })
    .then(async (charge) => {
      let updatePaymentStatus = await Booking.findOneAndUpdate(
        { _id: req.body.bookingId },
        {
          $set: {
            paymentStatus: 'completed',
          },
        }
      );
      //   let cart = req.body.cart;
      //   cart.map((product) => {
      //     order.products.push({
      //       productID: product._id,
      //       quantity: parseInt(product.quantity),
      //       price: product.price,
      //     });
      //   });
      //   order.owner = req.decoded._id;
      //   order.estimatedDelivery = req.body.estimatedDelivery;
      //   await order.save();

      res.json({
        success: true,
        res: updatePaymentStatus,
        message: 'Successfully made a payment',
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

module.exports = router;
