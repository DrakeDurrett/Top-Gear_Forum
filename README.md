# Top Gear Fan Forum 

## The Top Gear Fan Forum is place for all the fans of the great british automotive tv program!! Users can post about their favorite moments of the show, post pictures of their favorite moments and comment on other users posts! Users will also be able to view all of the vehicles on the show as well as their lap times and their is a dedicated page to the tamed racing driver "The Stig".


``` JAVASCRIPT
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
```