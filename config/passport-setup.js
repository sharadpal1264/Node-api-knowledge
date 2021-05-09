require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
let mongoose = require('mongoose');

const User = mongoose.model('User');

//Google Stratgey
passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: process.env.CALL_BACK,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {

      const profileID = profile.id;
      const email = profile.emails[0].value;
      const fullname=profile.displayName;
      const picture=profile.photos[0].value;

      // check if user already exists
      const currentUser = await User.findOne({ googleId: profileID });
      if (currentUser) {
        // already have the user -> return (login)
        return done(null, currentUser);
      } else {
        // register user and return
        const newUser = await new User({ email: email, googleId: profileID, fullname:fullname, picture:picture}).save();
        return done(null, newUser);
      }
    }
  )
);
