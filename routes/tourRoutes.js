const tourController = require('../controllers/tourController');
const express = require('express');
const router = express.Router();

router.param('id', (req, res, next, val) => { 
  console.log(`tour id is: ${val}`);
  next();
});

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
