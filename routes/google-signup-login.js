// import Database
require('../config/db');
// import User Model
require('../Model/User');

// import Passport-setup-Stratgies
require('../config/passport-setup');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Import Middleware Authentication
const {generateToken} = require('../middleware-Authentication');

const User = mongoose.model('User');

router.get('/',
  passport.authenticate('google', {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    approvalPrompt: "force"
  })
);

// callback url upon successful google authentication
router.get('/callback/',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    generateToken(req, res);
  }
);

module.exports = router;