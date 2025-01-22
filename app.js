const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES

app.use(morgan('dev'));    
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hell from the meddleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString().split('T')[0];
  next();
});

// 3) Routs

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) Start Server

const port = 3000;

app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
