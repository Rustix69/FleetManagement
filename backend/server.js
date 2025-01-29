require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/vehicles', require('./route/vehicleRoute'));
app.use('/api/assignments', require('./route/assignmentRoute'));
app.use('/api/fleets', require('./route/fleetRoute'));
app.use('/api/auth', require('./route/authRoute'));  

// Connect to Database
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
