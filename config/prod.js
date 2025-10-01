// prod.js - production keys here - do not commit this file to GitHub!
// Este arquivo DEVE usar APENAS as variáveis de ambiente configuradas no Vercel.

module.exports = {
   googleClientID: process.env.GOOGLE_CLIENT_ID,
   googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
   mongoURI: process.env.MONGO_URI,
   cookieKey: process.env.COOKIE_KEY,
   stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
   stripeSecretKey: process.env.STRIPE_SECRET_KEY,
   // Com o REDIRECT_DOMAIN como a URL raiz, precisamos adicionar a barra aqui.
   googleCallbackURL: process.env.REDIRECT_DOMAIN + '/auth/google/callback',
   sendGridKey: process.env.SEND_GRID_KEY,
   mailFrom: process.env.MAIL_FROM,
   redirectDomain: process.env.REDIRECT_DOMAIN
};
