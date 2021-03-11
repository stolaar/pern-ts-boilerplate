INSERT INTO users (name, email, password, instagram_username, address, city, postal_code, phone, birthday)
VALUES (${name}, ${email}, ${password}, ${instagram_username},  ${address}, ${city}, ${postal_code}, ${phone}, ${birthday})
RETURNING *
