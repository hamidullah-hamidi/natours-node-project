const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour mast have name'],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, 'A tour mast have a rating'],
  },
  price: {
    type: Number,
    required: [true, 'A Tour mast have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);
