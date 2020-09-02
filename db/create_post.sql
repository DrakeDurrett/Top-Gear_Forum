INSERT INTO posts
(title, post)
VALUES
($1, $2)
RETURNING *;