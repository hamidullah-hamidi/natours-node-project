const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.getAllReviews
  )
  .post(reviewController.createReview);

router.route('/:id').delete(reviewController.deleteReview);

module.exports = router;
