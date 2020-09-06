module.exports = {
    getPosts: async (req, res) => {
        const db = req.app.get('db');
        const posts = await db.get_posts();
        res.status(200).send(posts);
    },
    addPost: async (req, res) => {
        const db = req.app.get('db');
        const { user_id }  = req.params;
        const { title, content } = req.body;
        const newPost = await db.create_post(user_id, title, content);
        res.status(200).send(newPost);
    },

};