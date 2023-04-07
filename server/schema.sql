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

ALTER TABLE questions RENAME COLUMN id TO question_id;
ALTER TABLE questions RENAME COLUMN body TO question_body;
ALTER TABLE questions RENAME COLUMN date_written TO question_date;
ALTER TABLE questions RENAME COLUMN helpful TO question_helpfulness;


-- Divide each column by 1000 to get seconds
UPDATE questions SET question_date = question_date / 1000;

-- Change column type text
ALTER TABLE questions
ALTER COLUMN question_date TYPE text;

-- Update to date format
UPDATE questions SET question_date = TO_TIMESTAMP(cast(question_date AS bigint))::date;



UPDATE answers SET date_written = date_written / 1000;

-- Change column type text
ALTER TABLE answers
ALTER COLUMN date_written TYPE text;

-- Update to date format
UPDATE answers SET date_written = TO_TIMESTAMP(cast(date_written AS bigint))::date;