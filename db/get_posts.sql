SELECT posts.user_id, users.username, posts.post_id, posts.title, posts.content, posts.img_url FROM posts
JOIN users ON users.user_id = posts.user_id
ORDER BY post_id DESC;