const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  room: String,
  date: String,
  start: String,
  end: String,
  name: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
