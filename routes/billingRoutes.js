const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
   app.post('/api/stripe', requireLogin, async (req, res) => {
      try {
         const charge = await stripe.charges.create({
            amount: 500, // amount in cents
            currency: 'usd',
            source: req.body.id, // token from client
            description: 'Emaily credits'
         });
         //  res.send(charge);
         req.user.credits += 5;
         const user = await req.user.save();
         res.send(user);
      } catch (err) {
         res.status(500).send({ error: err.message });
      }
   });
};
