const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const app = express();
module.exports.app = app;
const port = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})