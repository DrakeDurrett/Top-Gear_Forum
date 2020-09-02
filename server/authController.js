const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const { email, username, password } = req.body;
        const foundUser = db.check_user(email);
        if(foundUser[0]){
            return res.status(401).send('Email already exists!')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await db.create_user(email, username, hash);
        req.session.user = {
            userId: newUser.user_id,
            email: newUser.email,
            username: newUser.username,
        }
        res.status(200).send(req.session.user);
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;
        let foundUser = await db.check_user(username);
        foundUser = foundUser[0];
        if(foundUser) {
            const compareHash = foundUser.password
            const authenticated = bcrypt.compareSync(password, compareHash)
            if(authenticated){
                delete foundUser.password;
                req.session.user = foundUser;
                res.status(200).send(foundUser)
            } else {
                res.status(401).send("Username/Password Incorrect")
            }
        }
    }
}