const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Define the data to insert
const locations = [
  {
    name: "Amer Fort",
    location: "Amer, Jaipur, Rajasthan",
    type: "Cultural",
    UNESCO_ID: "247",
    latitude: 26.9853,
    longitude: 75.8500
  },
  {
    name: "Jantar Mantar",
    location: "Jaipur, Rajasthan",
    type: "Cultural",
    UNESCO_ID: "1338",
    latitude: 26.9244,
    longitude: 75.8242
  },
  {
    name: "City Palace",
    location: "Jaipur, Rajasthan",
    type: "Cultural",
    latitude: 26.9253,
    longitude: 75.8239
  },
  {
    name: "Hawa Mahal",
    location: "Jaipur, Rajasthan",
    type: "Cultural",
    latitude: 26.9239,
    longitude: 75.8264
  },
  {
    name: "Jal Mahal",
    location: "Jaipur, Rajasthan",
    type: "Cultural",
    latitude: 26.9444,
    longitude: 75.8511
  },
  {
    name: "Albert Hall Museum",
    location: "Jaipur, Rajasthan",
    type: "Cultural",
    latitude: 26.9122,
    longitude: 75.8144
  }
];

// MongoDB URI
const mongoURI = process.env.MONGO_URL;

const locationSchema = new mongoose.Schema({
  name: String,
  location: String,
  type: String,
  UNESCO_ID: String,
  latitude: Number,
  longitude: Number,
});

const Location = mongoose.model('Location', locationSchema);

const populateDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    await Location.deleteMany({}); // Clear existing data
    console.log('Existing data cleared');

    await Location.insertMany(locations);
    console.log('Data inserted successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    mongoose.disconnect();
  }
};

populateDatabase();
