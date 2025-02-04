const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour mast have name'],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour mast have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour mast have a maxGroupSize'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour mast have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A Tour mast have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A Tour mast have a sammary'],
    },
    descrpition: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A Tour mast have a conver image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//  Document meddleware: runs before .save() and .create()
tourSchema.pre('save', function () {
  console.log(this);
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
