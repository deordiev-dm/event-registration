const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'https://event-registration-test-task.netlify.app/',
  })
);

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/registrations');

app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
