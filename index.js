const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');

mongoose
   .connect(keys.mongoURI)
   .then(() => console.log('✅ Conectado com sucesso!'))
   .catch(err => console.error('❌ Erro de conexão:', err.message));

const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
