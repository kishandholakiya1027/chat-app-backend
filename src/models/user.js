const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    required: false
  }
});

const user = mongoose.model('user', userSchema);

module.exports = user;