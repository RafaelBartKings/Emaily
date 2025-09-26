module.exports = app => {
   app.post('/api/stripe', (req, res) => {
      res.send(req.user);
   });
};
