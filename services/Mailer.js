const sg = require('@sendgrid/mail');
const keys = require('../config/keys');
sg.setApiKey(keys.sendGridKey);

module.exports = async (body, subject, recipients) => {
   const msg = {
      to: recipients.map(r => r.email),
      from: keys.mailFrom,
      subject,
      text: body
      // html: '<strong>' + body + '</strong>' // if you want HTML
   };

   try {
      const result = await sg.send(msg);
      console.log(result);
   } catch (err) {
      console.log(err);
   }
};
