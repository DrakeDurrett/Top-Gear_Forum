SELECT users.username, posts.post_id, posts.title, posts.content FROM posts
JOIN users ON users.user_id = posts.user_id
WHERE users.user_id = $1
ORDER BY post_id DESC;
