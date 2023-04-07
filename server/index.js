const express = require('express');
const db = require('./db/database.js');

const routes = require('./routes.js');
const morgan = require('morgan')
const cors = require('cors')
const app = express();
module.exports.app = app;
const port = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})