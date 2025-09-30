module.exports = survey => {
   return `
      <html>
         <body>
            <div style="text-align: center;">
               <h3>We'd love your feedback!</h3>
               <p>Please answer the following question:</p>
               <p>${survey.body}</p>
               <div>
                  <a href="http://localhost:3000/api/surveys/${survey.id}/yes" style="margin: 0 10px; padding: 10px 20px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;">Yes</a>
                  <a href="http://localhost:3000/api/surveys/${survey.id}/no" style="margin: 0 10px; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px;">No</a>
               </div>
            </div>
         </body>
      </html>
   `;
};
