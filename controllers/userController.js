const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');
const AppError = require('./../utilities/appError');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  try {
    res.status(200).json({
      status: 'success',
      result: users.length,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'The route is not defined yet',
    });
  }
});

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  try {
    res.status(201).json({
      status: 'success',
      newUser: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'The route is not defined yet',
    });
  }
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if the user POSTs update data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for update passwords. Please use /updateMyPassword'
      )
    );
  }

  // 2) Update user document
  res.status(200).json({
    status: 'success',
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    res.status(200).json({
      status: 'success',
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'The route is not defined yet',
    });
  }
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  try {
    res.status(200).json({
      status: 'success',
      deletedUser: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'The route is not defined yet',
    });
  }
});
