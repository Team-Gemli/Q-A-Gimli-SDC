const { Pool, Client } = require("pg");
require('dotenv').config();


const pool =  new Pool({
  user: process.env.POSTGRESQL_USERNAME,
  host: process.env.HOST,
  database: process.env.POSTGRESQL_DATABASE,
  password: process.env.POSTGRESQL_PASSWORD,
  port: process.env.PORT,
})
pool.connect((err) => {
  if(err) { console.log(err) } else {
    console.log("Connected to PostgreSQL");
  }
})

module.exports = pool;