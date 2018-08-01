const router = require('express').Router();
const stripe = require("stripe")("sk_test_FglRX3tkNhaVmQUzXQFrj2ZA");
module.exports = router

router.post('/charge', async (req, res, next) => {
  try {
    const token = req.body.stripeToken;

    let charge = await stripe.charges.create({
      amount: 90000000,
      currency: "usd",
      description: "An example charge",
      source: token
    });
    res.send(charge.status);
  } catch (err) {
    next(err)
  }
});
