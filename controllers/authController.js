const jwt = require('jsonwebtoken');
const AppError = require('../utilities/AppError');
const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // 1)  Check if email && password exist
  if (!password || !email) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2)  Check if user exist && password is correct
  const user = User.findOne({ email });

  // 3)  if everything is ok, send token to client

  const token = '';

  res.status(200).json({
    status: 'success',
    token,
  });
};
