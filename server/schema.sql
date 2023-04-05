DROP DATABASE IF EXISTS qna;

CREATE DATABASE qna;

\c qna;

CREATE TABLE questions(
  id serial PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR(255) NOT NULL,
  date_written BIGINT NOT NULL,
  asker_name VARCHAR(50) NOT NULL,
  asker_email VARCHAR(50) NOT NULL,
  reported BOOLEAN,
  helpful INT
);

CREATE TABLE answers(
  id serial PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(255) NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR(50) NOT NULL,
  answerer_email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL,
  helpful INT NOT NULL,
  FOREIGN KEY (question_id)
  REFERENCES questions(id)
);

CREATE TABLE answers_photos(
  id serial PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR(255),
  FOREIGN KEY (answer_id)
  REFERENCES answers(id)
);

\copy questions(id,product_id,body,date_written,asker_name,asker_email,reported,helpful) FROM '/home/mrkorn/rfe2302/Gemli/questions.csv' DELIMITER ',' CSV HEADER;

\copy answers(id,question_id,body,date_written,answerer_name,answerer_email,reported,helpful) FROM '/home/mrkorn/rfe2302/Gemli/answers.csv' DELIMITER ',' CSV HEADER;

\copy answers_photos(id,answer_id,url) FROM '/home/mrkorn/rfe2302/Gemli/answers_photos.csv' DELIMITER ',' CSV HEADER;

--"2018-08-18T00:00:00.00Z"