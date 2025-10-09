const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const path = require('path');
// 🚨 NOVO CÓDIGO: Importar CORS
const cors = require('cors');

require('./models/user');
require('./services/passport');
require('./models/Survey');

mongoose
   .connect(keys.mongoURI)
   .then(() => console.log('✅ Conectado com sucesso!'))
   .catch(err => console.error('❌ Erro de conexão:', err.message));

const app = express();

app.set('trust proxy', true);

app.use(bodyParser.json());

// 🚨 NOVO CÓDIGO: Configuração do CORS para permitir cookies/sessões entre portas
app.use(
   cors({
      origin: 'http://localhost:3000', // Permite a porta do React
      credentials: true // CRUCIAL: Permite o envio de cookies de sessão
   })
);
// Fim do NOVO CÓDIGO

app.use(
   session({
      secret: keys.cookieKey,
      resave: false,
      saveUninitialized: true
   })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
   const path = require('path');

   // Serve arquivos estáticos
   app.use(express.static(path.join(__dirname, 'client', 'build')));

   // Exceções: não deixar o catch-all interceptar o manifest.json ou favicon
   app.get(
      ['/manifest.json', '/favicon.ico', '/logo192.png', '/logo512.png'],
      (req, res) => {
         res.sendFile(path.resolve(__dirname, 'client', 'build', req.path));
      }
   );

   // Catch-all: qualquer outra rota cai no React
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`);
});
