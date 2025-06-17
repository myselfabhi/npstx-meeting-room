// api/lib/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  room: String,
  date: String,
  start: String,
  end: String,
  name: String,
});

// Prevent re-registering the model in hot reload/dev
export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
