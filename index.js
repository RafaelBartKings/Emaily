const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); // Mudei aqui
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose
   .connect(keys.mongoURI)
   .then(() => console.log('✅ Conectado com sucesso!'))
   .catch(err => console.error('❌ Erro de conexão:', err.message));

const app = express();

// Adicione a configuração do express-session
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

// app.get('/', (req, res) => {
//   res.send('Olá, a aplicação está funcionando!');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT);
