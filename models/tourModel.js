const mongoose = require('mongoose');
const { default: slugify } = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour mast have name'],
      unique: true,
      trim: true,
      maxLength: [40, 'A tour must have less or equal than 40 character'],
      minLength: [10, 'A tour must have more or equal than 10 character'],
    },
    slug: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A Tour mast have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price({VALUE}) should be below regular price',
      },
    },
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
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//  DOCUMENT meddleware: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//  QUERY meddleware: runs before .save() and .create()
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Qurey took ${Date.now() - this.start} miliseconds`);
  next();
});

// AGGREGATTION meddleware:
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { $secretTour: { $ne: true } } });
  // console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
