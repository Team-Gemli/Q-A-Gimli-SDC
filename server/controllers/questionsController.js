let models = require('../models/model.js');

let product_id = 4539;
module.exports = {
  getQuestions: (req, res) => {
    models.questions.getQuestions((err, results) => {
      if (err) throw err;
      console.log('suceeded')
      res.json(results);
    }, product_id)
  }
};