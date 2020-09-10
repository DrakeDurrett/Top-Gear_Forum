SELECT users.username, posts.user_id, posts.post_id, posts.title, posts.content FROM users
JOIN posts ON posts.user_id = users.user_id
WHERE posts.user_id = $1
ORDER BY post_id DESC;