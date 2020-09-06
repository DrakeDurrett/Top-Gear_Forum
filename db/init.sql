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
    post VARCHAR(500)
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    post_id INT REFERENCES posts(post_id),
    content VARCHAR(500)
);

CREATE TABLE cars(
    car_id SERIAL PRIMARY KEY,
    car_name VARCHAR(200),
    lap_time VARCHAR(15),
    car_picture TEXT
);


SELECT * FROM posts
JOIN users ON users.user_id = posts.user_id;

INSERT INTO posts
(user_id, title, post)
VALUES
(1, 'Jeremy', 'Jeremy Clarkson is the best!!'),
(1, 'Specials', 'I love every Top Gear special!'),
(2, 'POWERR', 'Which car had the fastest lap time?'),
(2, 'Bugatti', 'The bugatti blew my mind on this show!!'),
(3, 'Hamster', 'Happy that Hammond was okay after his most recent crash!');
