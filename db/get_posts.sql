SELECT * FROM posts
JOIN users ON users.user_id = posts.user_id
ORDER BY post_id;