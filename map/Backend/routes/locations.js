const express = require('express');
const router = express.Router();
const Location = require('../models/location'); // Make sure the path is correct

// GET request to fetch locations from the database
router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find(); // Fetch all locations
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching locations' });
  }
});

module.exports = router;
