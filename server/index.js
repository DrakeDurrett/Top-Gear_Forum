require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const authCtrl = require('./controller/authController');
const carCtrl = require('./controller/carsController');
const postsCtrl = require('./controller/postsController');
const app = express();

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 7},
    secret: SESSION_SECRET
}))

// Auth Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.put('/auth/user')
app.delete('/auth/logout', authCtrl.logout);

// Post endpoints
app.get('/api/posts', postsCtrl.getPosts);
app.post('/api/post/:user_id', postsCtrl.addPost);

// Car Endpoints
app.get('/api/cars', carCtrl.getCars);


massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('Connected to DB')
}).catch(err => console.log(err));


app.listen( SERVER_PORT, () => console.log(`Server listening on port: ${SERVER_PORT}`));


