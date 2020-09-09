module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db');
        const posts = await db.get_posts();
        res.status(200).send(posts);
    },
    getPost: async (req, res) => {
        const db = req.app.get('db');
        const { post_id} = req.params;
        const post = await db.get_post(post_id);
        res.status(200).send(post);
    },
    getUsersPosts: async (req, res) => {
        const db = req.app.get('db');
        const { user_id } = req.params;
        const usersPosts = await db.get_users_posts(user_id);
        res.status(200).send(usersPosts);
    },
    addPost: async (req, res) => {
        const db = req.app.get('db');
        const { user_id }  = req.params;
        const { title, content } = req.body;
        const newPost = await db.create_post(user_id, title, content);
        res.status(200).send(newPost);
    },
    editPost: async (req, res) => {
        const db = req.app.get('db');
        const { post_id } = req.params;
        const { title, content } = req.body;
        const post = await db.edit_post(title, content, post_id);
        res.status(200).send(post);
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db');
        const { post_id } = req.params;
        const deletePost = await db.delete_post(post_id);
        res.status(200).send(deletePost);
    },
};