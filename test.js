const mongoose = require('mongoose');
console.log('hi test.js');

const DB =
  'mongodb+srv://hamidullah:079857ha@cluster0.tvzu6.mongodb.net/myDatabase?retryWrites=true&w=majority';

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Database connected successfully!'))
  .catch((err) => console.log('❌ Connection failed:', err));
