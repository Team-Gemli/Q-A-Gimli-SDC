let db = require('../db/database.js');

module.exports = {
  getAnswers: (callback)=> {
    db.query('SELECT * FROM answers LIMIT 100')
    .then(res => {
      callback(null, res)})
    .catch(err => callback(err));
  }
}
