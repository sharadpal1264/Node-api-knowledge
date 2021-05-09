// import Database
require('../config/db');

// import User Model
require('../Model/User');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { check, validationResult } = require('express-validator');


//Import Middleware Authentication
const {generateToken} = require('../middleware-Authentication');


// Register User (Public API)
router.post('/register',
  //Fields Validation checks
  [
    check('fullname', 'fullname is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    //Error throw in case of any validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //req reading
    const { fullname, email, password } = req.body;
      //check for the existing user
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({
            error:[{ 'message':"User already exist", "Email":user.email }]
          });
      }

      // creating a new user
      user = new User({
        fullname,
        email,
        password
      });

      //bcrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save((err)=>{
       if (err) throw err;
      let payload={
        "fullname":user.fullname,
        "id":user.id,
        "email":user.email
       }
       req.user=payload;
       generateToken(req,res);
      })
  }
);

// @route    POST Login api/auth
// @desc     Authenticate user & genrate token and stored in cookies
router.post('/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Emai-Id not Exist !!' }] });
      }

      if (!user.password) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Please Login with your Google Account !!' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Incorrect password !!' }] });
      }

      const payload={
        "fullname":user.fullname,
        "id":user.id,
        "email":user.email,
       }

      jwt.sign(payload,'secretkey',{expiresIn:'5 min'},
        (err, token) => {
          if (err) throw err;

var tokengenrated_DateTime = new Date();
var expiresIn_epoctime = Date.now(tokengenrated_DateTime);
console.log(expiresIn_epoctime);

          res.json({
            message:"Logged in successfully !!",
            token:token
          
          }); 
        });
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


module.exports = router;