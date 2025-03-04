const { default: mongoose, mongo } = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, 'Review con not be empty!'],
  },
  ratting: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Tour must have a rating!'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true, 'Tour must have a reference!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Tour must have a reference!'],
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
