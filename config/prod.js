// prod.js - production keys here - do not commit this file to GitHub!

module.exports = {
   googleClientID: process.env.GOOGLE_CLIENT_ID,
   googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
   mongoURI: process.env.MONGO_URI,
   cookieKey: process.env.COOKIE_KEY,
   stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
   googleCallbackURL: 'https://emaily-coral.vercel.app/auth/google/callback'
};
