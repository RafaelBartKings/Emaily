const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
   app.post('/api/stripe', async (req, res) => {
      try {
         const charge = await stripe.charges.create({
            amount: 500, // amount in cents
            currency: 'usd',
            source: req.body.id, // token from client
            description: 'Emaily credits'
         });
         res.send(charge);
      } catch (err) {
         res.status(500).send({ error: err.message });
      }
   });
};
