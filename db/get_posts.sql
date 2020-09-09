SELECT users.user_id, users.username, posts.post_id, posts.title, posts.content FROM posts
JOIN users ON users.user_id = posts.user_id
ORDER BY post_id DESC;