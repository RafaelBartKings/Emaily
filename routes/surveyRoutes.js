const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplates = require('../services/emailTemplates/surveyTemplates');

const Survey = mongoose.model('surveys');

module.exports = app => {
   app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
         title,
         subject,
         body, // Este 'body' é o texto da pergunta, não o HTML
         recipients: recipients
            .split(',')
            .map(email => ({ email: email.trim() })),
         _user: req.user.id,
         dateSent: Date.now()
      });

      // 1. GERAR O HTML COMPLETO:
      // Chama a função 'surveyTemplates' passando o objeto 'survey' para gerar o HTML.
      const htmlBody = surveyTemplates(survey);

      // 2. ENVIAR O HTML:
      // Agora o primeiro argumento é o 'htmlBody' (a string HTML formatada)
      try {
         await Mailer(htmlBody, survey.subject, survey.recipients);

         await survey.save();
         req.user.credits -= 1;
         const user = await req.user.save();
         res.send(user);
      } catch (err) {
         console.error(err);
         res.status(422).send(err);
      }
   });
};
