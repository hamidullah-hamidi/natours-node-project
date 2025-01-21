const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

// 1) MIDDLEWARES

app.use(morgan('dev'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hell from the meddleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString().split('T')[0];
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) Route Handlers

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

<<<<<<< HEAD
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((e) => e.id === id);
=======
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => (el.id = id));

  if (id > tours.length || !tours) {
    return res.status(404).json({
      status: 'faild',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
>>>>>>> b7b615ea4966faa55170e75bd8e5fd476108fb9c

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
<<<<<<< HEAD
  ); /* آیدی را با آبچکت delete درخواست  یکجا میکند*/
=======
  ); /* آیدی را با آبچکت درخواست یکجا میکند*/
>>>>>>> b7b615ea4966faa55170e75bd8e5fd476108fb9c

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
<<<<<<< HEAD
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

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) Routs

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// 4) Start Server
=======
});
>>>>>>> b7b615ea4966faa55170e75bd8e5fd476108fb9c

const port = 3000;

app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
