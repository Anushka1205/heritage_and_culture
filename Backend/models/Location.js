const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  latitude: Number,
  longitude: Number,
  images: [String] // Array of strings to store image URLs
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
