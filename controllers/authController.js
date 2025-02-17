const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utilities/AppError');
const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1)  Check if email && password exist
  if (!password || !email) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2)  Check if user exist && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3)  if everything is ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1)  Get the token and check if it's true

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);

  if (!token) {
    return next(
      new AppError('You are not logged in!, please login to get access.', 401)
    );
  }

  // 2)  Verification token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decode);

  // 3)  Check if user still exists
  const freshUser = await User.findById(decode.id);
  if (!freshUser) {
    return next(
      new AppError('The user belong to this token no longer exist!', 401)
    );
  }
  // 4)  Check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decode.iat)) {
    return next(
      new AppError('User recently changed password, please login again!', 401)
    );
  }

  // Grant access to protected route
  req.user = freshUser;
  next();
});
