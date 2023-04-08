const routes = require('express').Router();
const controller = require('./controllers/controller.js');


routes.get('/questions', controller.questions.getQuestions);
routes.get('/questions/answers', controller.questions.getAnswers);
routes.post('/questions/:id/answers', controller.questions.submitAnswer);
routes.post('/questions/ask', controller.questions.submitQuestion);
module.exports = routes;