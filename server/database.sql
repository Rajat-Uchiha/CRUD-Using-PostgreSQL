CREATE DATABASE perntodo;

-- CREATING TABLE todo (defining a table schema)
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)

)