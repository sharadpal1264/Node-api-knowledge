let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// Basic User Schema for Google Authentication
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email required'],
        unique: [true, 'email already registered']
    },
    googleId: {
        type: String,
        default: null
    },
    fullname: {
        type: String,
        default: null
    },
    picture: {
        type: String,
        default: null
    },
    password: {
        type: String
      }
});

module.exports = mongoose.model('User', userSchema);