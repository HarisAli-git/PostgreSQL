CREATE DATABASE perntodo;

CREATE TABLE products(
  id SERIAL PRIMARY KEY,
  category VARCHAR(55),
  name VARCHAR(50),
  price INTEGER,
  img_src VARCHAR(5555)
);

CREATE TABLE categories(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);