const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const { email, username, password } = req.body;
        const existingUser = await db.get_user([username]);
        if(existingUser[0]) {
            return res.status(401).send('Username already exists!')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await db.create_user(email, username, hash);
        req.session.user = newUser[0];
        res.status(200).send(req.session.user);
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;
        let existingUser = await db.get_user(username);
        if(!existingUser[0]) {
            return res.status(404).send("Username not found")
        }
        const authenticated = bcrypt.compareSync(password, existingUser[0].password);
        if(!authenticated){
                return res.status(500).send("Username/Password Incorrect")
            } 
            req.session.user = existingUser[0];
            res.status(200).send(req.session.user);
        },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}
