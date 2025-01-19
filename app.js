const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello from the server', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.send('Post method work!');
// });

console.log(`${__dirname}/dev-data/data/tours-simple.json`);

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;

  res.send('Done');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App runing on port ${port}...`);
});
