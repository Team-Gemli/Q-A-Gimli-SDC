let models = require('../models/model.js');

module.exports = {
  getQuestions: (req, res) => {
    //using a regex to get the product id out of the url
    let url = req.url;
    let regex = /product_id=(\d+)/;
    let match = url.match(regex);
    let productId = match && match[1];
    models.questions.getQuestions((err, result) => {
      if (err) throw err;
      let newObj = {};
      newObj.product_id = productId;
      newObj.results = result.rows;
      res.json(newObj);
    }, productId)
  },

  getAnswers: (req, res) => {
    let url = req.url;
    let regex = /\/questions\/(\d+)\//;
    let match = url.match(regex);
    let questionId = match && match[1];
    models.questions.getAnswers((err, results) => {
      if (err) throw err;
      let newObj = {};
      newObj.question = questionId;
      newObj.results = results.rows;
      res.json(newObj);
    }, questionId)
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
    models.questions.submitQuestion(req.body, (err, results) => {
      if (err) {
        console.log(err);
      }
      res.json('Inserted question');
    })
  },

  updateHelpfulnessAnswer: (req, res) => {
    models.questions.updateHelpfulnessAnswer(req.params.id, (err, results)=> {
      if (err) console.log(err);
      res.json('updated Helpfulness')
    })
  },

  updateHelpfulnessQuestion: (req, res) => {
    models.questions.updateHelpfulnessQuestion(req.params.id, (err, results)=> {
      if (err) console.log(err);
      res.json('updated Helpfulness')
    })
  },

  reportAnswer: (req, res) => {
    models.questions.reportAnswer(req.params.id, (err, results)=> {
      if (err) console.log(err);
      res.json('updated Helpfulness')
    })
  },
};