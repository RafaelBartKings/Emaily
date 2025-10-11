const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplates = require('../services/emailTemplates/surveyTemplates');

const Survey = mongoose.model('surveys');

module.exports = app => {
   app.get('/api/surveys', requireLogin, async (req, res) => {
      const surveys = await Survey.find({ _user: req.user.id }).select({
         recipients: false
      }); // Exclui o campo 'recipients' da resposta
      res.send(surveys);
   });

   app.get('/api/surveys/thanks', (req, res) => {
      res.send('Thanks for voting!');
   });

   app.post('/api/surveys/webhooks', (req, res) => {
      const p = new Path('/api/surveys/:surveyId/:choice');

      _.chain(req.body)
         .map(req.body, ({ email, url }) => {
            const match = p.test(new URL(url).pathname);

            if (match) {
               return { email, surveyId: match.surveyId, choice: match.choice };
            }
         })
         .compact()
         .uniqBy('email', 'surveyId')
         .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
               {
                  _id: surveyId,
                  recipients: { $elemMatch: { email: email, responded: false } }
               },
               {
                  $inc: { [choice]: 1 }, // Incrementa a contagem de 'yes' ou 'no'
                  $set: { 'recipients.$.responded': true }, // Marca como respondido
                  lastResponded: new Date() // Atualiza a data da última resposta
               }
            ).exec();
         })
         .value();

      res.send({}); // Responde com 200 OK vazio
   });

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
