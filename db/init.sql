CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    username VARCHAR(100),
    password VARCHAR(200)
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(200),
    post VARCHAR(500),
    user_id INT REFERENCES users(user_id)
)

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    content VARCHAR(500),
    user_id INT REFERENCES users(user_id),
    post_id INT REFERENCES posts(post_id)
);