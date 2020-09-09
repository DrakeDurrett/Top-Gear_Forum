SELECT posts.post_id, posts.title, posts.content, users.username, users.user_id FROM posts
JOIN users ON users.user_id = posts.user_id
WHERE posts.post_id = $1;