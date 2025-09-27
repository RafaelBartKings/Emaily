const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); // Mudei aqui
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

mongoose
   .connect(keys.mongoURI)
   .then(() => console.log('✅ Conectado com sucesso!'))
   .catch(err => console.error('❌ Erro de conexão:', err.message));

const app = express();

app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
   // Serve arquivos estáticos como index.html, main.js, etc.
   app.use(express.static('client/build'));

   // Serve o index.html se a rota não for reconhecida
   const path = require('path');
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

app.get('/', (req, res) => {
   res.send('Olá, a aplicação está funcionando!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
