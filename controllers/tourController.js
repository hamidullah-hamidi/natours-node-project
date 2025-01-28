const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    requestedTime: req.requestTime,
    status: 'success',
    // result: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((e) => e.id === id);

  // res.status(200).json({
  //   status: 'success',
  // result: tours.length,
  // data: {
  //   tour,
  // },
  // });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await new Tour.create(req.body);

    res.status(201).json({
      staus: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: 'Upadated',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
