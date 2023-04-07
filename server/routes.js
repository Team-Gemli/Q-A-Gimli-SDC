const routes = require('express').Router();
const controller = require('./controllers/controller.js');


routes.get('/questions', controller.questions.getQuestions);
routes.get('/answers', controller.answers.getAnswers);

module.exports = routes;