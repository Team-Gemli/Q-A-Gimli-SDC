let db = require('../db/database.js');

module.exports = {
  getQuestions: (callback, id)=> {
    db.query(`
    SELECT * FROM questions
    JOIN answers
     ON answers.question_id = questions.question_id
      WHERE product_id = ${id} LIMIT 100`)
    .then(res => {
      callback(null, res)})
    .catch(err => callback(err));
  }
}
