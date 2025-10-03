Emaily

Aplicação fullstack para envio de campanhas de email, com autenticação via Google OAuth, integração com Stripe para pagamentos e persistência de dados no MongoDB.

🚀 Tecnologias

Backend: Node.js, Express, Passport.js

Frontend: React (CRA)

Banco de dados: MongoDB Atlas (Mongoose)

Deploy: Vercel (frontend + backend serverless)

Autenticação: Google OAuth 2.0

Pagamentos: Stripe

📦 Estrutura do projeto
.
├── client/           # Aplicação React
│   ├── public/
│   └── src/
├── config/           # Chaves de API (dev.js, prod.js, keys.js)
├── models/           # Schemas do Mongoose
├── routes/           # Rotas Express (auth, billing, surveys, etc.)
├── services/         # Configurações do Passport e helpers
├── index.js          # Servidor Express principal
└── vercel.json       # Configuração do deploy na Vercel

⚙️ Configuração
1. Clonar o repositório
git clone https://github.com/seu-usuario/emaily.git
cd emaily

2. Instalar dependências
# Backend
npm install

# Frontend
cd client
npm install
cd ..

3. Variáveis de ambiente

Crie arquivos dev.js e prod.js dentro da pasta config/.

dev.js (exemplo):

module.exports = {
  googleClientID: "SEU_CLIENT_ID",
  googleClientSecret: "SEU_CLIENT_SECRET",
  mongoURI: "mongodb://localhost:27017/emaily-dev",
  cookieKey: "chave-secreta",
  stripePublishableKey: "SEU_STRIPE_PUBLISHABLE_KEY",
  stripeSecretKey: "SEU_STRIPE_SECRET_KEY"
};


prod.js deve usar variáveis de ambiente:

module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY
};

4. Rodar em ambiente local
# Iniciar backend (porta 5000)
npm run dev

# Em outra aba: iniciar frontend (porta 3000)
cd client
npm start


A aplicação ficará disponível em:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

🚀 Deploy na Vercel

O projeto está configurado para deploy automático na Vercel.

O arquivo vercel.json garante que o index.js do Express rode como Serverless Function e o React seja servido em produção.

🔑 Autenticação Google OAuth

Certifique-se de configurar os Authorized Redirect URIs no Google Cloud Console
:

http://localhost:5000/auth/google/callback

http://localhost:3000/auth/google/callback

https://seu-projeto.vercel.app/auth/google/callback

💳 Integração com Stripe

O sistema usa o Stripe para gerenciar créditos dos usuários.
Após login, o usuário pode comprar créditos e utilizá-los para enviar campanhas de email.

📬 Funcionalidades

Login com Google

Gerenciamento de créditos via Stripe

Criação de campanhas

Envio de emails para lista de destinatários

Registro de respostas (clicou / não clicou)

