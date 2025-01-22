const express = require('express');

const router = express.Router();

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not defined yet',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not defined yet',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not defined yet',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not defined yet',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The route is not defined yet',
  });
};

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
