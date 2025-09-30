const sg = require('@sendgrid/mail');
const keys = require('../config/keys');

// Define a chave API do SendGrid
sg.setApiKey(keys.sendGridKey);

// Loga o email de envio para verificar se a variável está sendo lida corretamente
console.log('SendGrid Remetente (Verificação):', keys.mailFrom);

module.exports = async (body, subject, recipients) => {
   // A API do SendGrid é estrita. O SDK espera uma string simples de email aqui.
   // Usamos o fallback para garantir que o campo 'from' nunca seja vazio.
   const senderEmail = keys.mailFrom || 'rafyangtj@gmail.com';

   const msg = {
      to: recipients[0].email,
      from: senderEmail, // Apenas a string do email
      subject,
      // CORREÇÃO CRÍTICA: 'body' já é a string HTML completa do template.
      // Apenas use a variável diretamente, sem adicionar tags '<strong>'.
      html: body,
      // Adiciona uma versão em texto puro para fallback
      text: 'Por favor, responda a pesquisa clicando em um dos links: Sim ou Não.'
   };

   try {
      const result = await sg.send(msg);
      console.log('Email enviado com sucesso. Status:', result[0].statusCode);
   } catch (err) {
      // Loga o erro completo do SendGrid
      if (err.response && err.response.body) {
         console.error('❌ SendGrid Error Details:', err.response.body.errors);
      } else {
         // Este bloco pega erros como o 'String or address object expected'
         console.error('❌ Erro inesperado do SendGrid:', err);
      }
   }
};
