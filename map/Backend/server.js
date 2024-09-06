const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const locationRoutes = require('./routes/locations'); // Import your routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Use the locations route
app.use('/api', locationRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
