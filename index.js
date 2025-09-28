const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// Necessário para o path
const path = require('path');

require('./models/user');
require('./services/passport');

mongoose
   .connect(keys.mongoURI)
   .then(() => console.log('✅ Conectado com sucesso!'))
   .catch(err => console.error('❌ Erro de conexão:', err.message));

const app = express();

app.use(bodyParser.json());

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

// REMOVENDO a rota de teste, conforme discutido.
// app.get('/', (req, res) => {
//    res.send('Olá, a aplicação está funcionando!');
// });

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
   // Adicione um log aqui, se quiser confirmar a porta no local:
   console.log(`Server listening on port ${PORT}`);
});
