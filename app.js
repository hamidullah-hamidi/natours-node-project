const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hell from the meddleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString().split('T')[0];
  next();
});

// 2) Routs

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'faild',
  //   message: `Can't find ${req.originalUrl} in this server!`,
  // });

  const err = new Error(`Can't find ${req.originalUrl} in this server!`);
  (err.status = 'fail'), (err.statusCode = 404);

  next(err);
});

// Error handling meddleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  req.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
