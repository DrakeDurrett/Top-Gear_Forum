module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db');
        const posts = await db.get_posts();
        res.status(200).send(posts);
    },
    getUsersPosts: async (req, res) => {
        const db = req.app.get('db');
        const {user_id} = req.session.user;
        const usersPosts = await db.get_users_posts([user_id]);
        res.status(200).send(usersPosts);
    },
    createPost: async (req, res) => {
        const db = req.app.get('db');
        const { user_id }  = req.params;
        const { title, content, img_url } = req.body;
        const newPost = await db.create_post(user_id, title, content, img_url);
        res.status(200).send(newPost);
    },
    editPost: async (req, res) => {
        const db = req.app.get('db');
        const { title, content } = req.body;
        const { post_id } = req.params;
        const post = await db.edit_post(title, content, post_id);
        console.log(post)
        res.status(200).send(post);
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db');
        const { post_id } = req.params;
        const deletePost = await db.delete_post(post_id);
        res.status(200).send(deletePost);
    },
};