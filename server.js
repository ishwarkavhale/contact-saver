const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database

connectDB();
app.get('/', (req, res) => res.send('Hello to code  World!'));

// Middleware for accesing contentent from req.body used in users

app.use(express.json({ extended: false }));

// Define Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) console.error(error.message);
  console.log(`server started on port ${PORT}`);
});
