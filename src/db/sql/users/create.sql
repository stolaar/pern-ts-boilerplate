CREATE TABLE IF NOT EXISTS users
(
    user_id            serial PRIMARY KEY,
    first_name         text NOT NULL,
    email              text NOT NULL,
    password           text NOT NULL,
    is_active          BOOLEAN DEFAULT FALSE,
    address            text,
    city               text,
    postal_code        text,
    phone              text,
    birthday           text
)
