let models = require('../models/model.js');

module.exports = {
  getAnswers: (req, res) => {
    models.answers.getAnswers((err, results) => {
      if (err) throw err;
      console.log('suceeded')
      res.json(results);
    })
  }
};