require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const aws = require('aws-sdk');
const path = require('path');
const authCtrl = require('./controller/authController');
const carCtrl = require('./controller/carsController');
const postsCtrl = require('./controller/postsController');
const app = express();

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},
    secret: SESSION_SECRET
}))


// Auth Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.put('/auth/user');
app.delete('/auth/logout', authCtrl.logout);

// Post endpoints
app.get('/api/posts', postsCtrl.getPosts);
app.get('/api/profile/:user_id', postsCtrl.getUsersPosts);
app.post('/api/post/:user_id', postsCtrl.createPost);
app.put('/api/editPost/:post_id', postsCtrl.editPost);
app.delete('/api/deletePost/:post_id', postsCtrl.deletePost);

// Car Endpoints
app.get('/api/cars', carCtrl.getCars);


// S3 Endpoint
app.get('/sign-s3', (req, res) => {
  
  aws.config = {
    region: 'us-east-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 600,
    ContentType: fileType,
    ACL: 'public-read'
  };
  
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    
    return res.send(returnData)
  });
});

// Hosting Endpoint 
app.use(express.static(`${__dirname}/../build`));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
});

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