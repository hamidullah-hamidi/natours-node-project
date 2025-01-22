const express = require('express');
const fs = require('fs');
const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    requestedTime: req.requestTime,
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((e) => e.id === id);

  if (id > tours.length || !tours) {
    res.status(404).json({
      status: 'faild',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign(
    { id: newId },
    req.body
  ); /* آیدی را با آبچکت delete درخواست  یکجا میکند*/

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        staus: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'faild',
      message: 'Faild to update!',
    });
  }

  res.status(200).json({
    status: 'success',
    data: 'Upadated',
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'faild',
      message: 'Faild to delete!',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
