require('dotenv').config();
const express = require('express');

const passport = require('passport');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key:process.env.cloudinary_api_key,
  api_secret:process.env.cloudinary_api_secret
});

// import Database
require('./config/db');

// import User Model
require('./Model/User');

// import Passport-setup-Stratgies
require('./config/passport-setup');

app.use(function(req, res, next) {
  let allowedOrigins = ['*']; // list of url-s
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  next();
});

app.use(passport.initialize());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : path.join(__dirname,'tmp'),
}));
app.use(express.json());; // for parsing application/json
app.use(express.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/'));
app.use(function(err, req, res, next) {
  res.status(500).send('There is some error in you Input !!');
});
app.use(cors());

app.use('/local',require('./routes/local-signup-login'));

app.use('/google',require('./routes/google-signup-login'));

app.use('/auth',require('./routes/private-routes'));

app.listen(4000, function() {
  console.log('Express app listening on port 4000!');
});