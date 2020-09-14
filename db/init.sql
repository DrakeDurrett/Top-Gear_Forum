CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    username VARCHAR(100),
    password VARCHAR(200)
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(200),
    post VARCHAR(500),
    img TEXT
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    post_id INT REFERENCES posts(post_id),
    content VARCHAR(500)
);

CREATE TABLE cars(
    car_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    lap_time VARCHAR(15),
    image TEXT
);


SELECT * FROM posts
JOIN users ON users.user_id = posts.user_id;

