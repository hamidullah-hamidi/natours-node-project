const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
  },
  photo: {
    type: String,
    required: [true, 'A user must have a photo'],
  },
  password: {
    type: Number,
    required: [true, 'A user must have a password'],
  },
  passwordConfirm: {
    type: Number,
    required: [true, 'A user must have a passwordConfirm'],
  },
});

const userModel = mongoose.Model('userModel', userSchema);
console.log('hi hamid');
