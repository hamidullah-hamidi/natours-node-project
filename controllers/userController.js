const User = require('../models/userModel');
const catchAsync = require('../utilities/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    result: users.length,
    data: users,
  });

  res.status(500).json({
    status: 'error',
    message: 'The route is not defined yet',
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    newUser: newUser,
  });

  res.status(500).json({
    status: 'error',
    message: 'The route is not defined yet',
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    user: user,
  });

  res.status(500).json({
    status: 'error',
    message: 'The route is not defined yet',
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    updatedUser: user,
  });

  res.status(500).json({
    status: 'error',
    message: 'The route is not defined yet',
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: 'success',
    deletedUser: user,
  });

  res.status(500).json({
    status: 'error',
    message: 'The route is not defined yet',
  });
});
