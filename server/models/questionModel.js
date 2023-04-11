let db = require('../db/database.js');

module.exports = {
  getQuestions: (callback, id)=> {
    db.query(`
    SELECT

  questions.question_id,
  questions.product_id,
  questions.question_body,
  questions.question_date,
  questions.asker_name,
  questions.asker_email,
  questions.reported,
  questions.question_helpfulness,

      json_object_agg(
        answers.id, json_build_object(
          'id', answers.id,
          'body', answers.body,
          'date_written', answers.date_written,
          'answerer_name', answers.answerer_name,
          'answerer_email', answers.answerer_email,
          'helpful', answers.helpful,
          'photos', json_build_array(
            answers_photos.url)
            )) AS answers

    FROM questions
    INNER JOIN answers
    ON answers.question_id = questions.question_id
    INNER JOIN answers_photos
    ON answers_photos.answer_id = answers.id

     WHERE questions.product_id = $1

     GROUP BY product_id, questions.question_id
     ORDER BY questions.question_date DESC
     LIMIT 100`, [id])

      .then(res => {
      callback(null, res)})
      .catch(err => callback(err));
  },

  getAnswers: (callback, question_id)=> {
    db.query(`
    SELECT

        answers.id AS answer_id,
        answers.answerer_name,
        answers.body,
        answers.date_written AS date,
        answers.helpful AS helpfulness,
        answers.answerer_email,
        json_build_array(
          answers_photos.url) AS photos

        FROM answers
        INNER JOIN answers_photos
        ON answers_photos.answer_id = answers.id
        WHERE answers.question_id = $1
        LIMIT 100`, [question_id]
        )
    .then(res => {
      callback(null, res)})
    .catch(err => callback(err));
  },


  submitAnswer: (question_id, params, callback) => {
    params.question_id = question_id;
    params.currentDate = new Date();

    db.query(`
    INSERT INTO answers
    (question_id, body, answerer_name, answerer_email, date_written, helpful, reported)
    VALUES ($1, $2, $3, $4, current_date, 0, false);
    `, [question_id, params.body, params.name, params.email])
    .then(res => {
      callback(null, res)
    })
    .catch(err => callback(err))
  },

  submitQuestion: (params, callback) => {
    let body = params.body;
    let name = params.name;
    let email = params.email;
    let product_id = params.product_id;
    db.query(`
    INSERT INTO questions
    (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
    VALUES ($1, $2, current_date, $3, $4, false, 0);
    `,[product_id, body, name, email])
    .then(res => {
      callback(null, res);
    })
    .catch(err => callback(err));
  },

  updateHelpfulnessAnswer: (id, callback) => {
    db.query(`
    UPDATE answers
    SET helpful = helpful + 1
    WHERE id = $1;`, [id])
    .then(res => {
      callback(null, res);
    })
    .catch(err => callback(err));
  },

  updateHelpfulnessQuestion: (id, callback) => {
    db.query(`
    UPDATE questions
    SET question_helpfulness = question_helpfulness + 1
    WHERE question_id = $1;`, [id])
    .then(res => {
      callback(null, res);
    })
    .catch(err => callback(err));
  },

  reportAnswer: (id, callback) => {
    db.query(`
    UPDATE answers
    SET reported = true
    WHERE id = $1;`, [id])
    .then(res => {
      callback(null, res);
    })
    .catch(err => callback(err));
  }
}