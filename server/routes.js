const routes = require('express').Router();
const controller = require('./controllers/controller.js');


routes.get('/questions', controller.questions.getQuestions);
routes.get('/questions/:id/answers', controller.questions.getAnswers);

routes.post('/questions/:id/answers', controller.questions.submitAnswer);
routes.post('/questions/ask', controller.questions.submitQuestion);

//answer
routes.put('/answers/:id/helpful', controller.questions.updateHelpfulnessAnswer);
routes.put('/answers/:id/report', controller.questions.reportAnswer);

//question
routes.put('/questions/:id/helpfulness',controller.questions.updateHelpfulnessQuestion);


module.exports = routes;