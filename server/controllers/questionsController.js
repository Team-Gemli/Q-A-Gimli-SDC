let models = require('../models/model.js');

let product_id = 37311;

let question_id = 641997;

let submitObj = {

}
module.exports = {
  getQuestions: (req, res) => {
    models.questions.getQuestions((err, results) => {
      if (err) throw err;
      console.log('suceeded')
      res.json(results);
    }, product_id)
  },

  getAnswers: (req, res) => {
    models.questions.getAnswers((err, results) => {
      if (err) throw err;
      console.log('suceeded')
      res.json(results);
    })
  },

  submitAnswer: (req, res) => {
    models.questions.submitAnswer(req.params.id, req.body, (err, results) => {
      if (err) {
        console.log(err);
      }
      res.json('Inserted answer');
    })
  },


  submitQuestion: (req, res) => {
    console.log(req.body)
    models.questions.submitQuestion(req.body, (err, results) => {
      if (err) {
        console.log(err);
      }
      res.json('Inserted question');
    })
  },
};