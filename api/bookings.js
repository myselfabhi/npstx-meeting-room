// api/bookings.js
import mongoose from 'mongoose';
import Booking from './lib/Booking.js';

const uri = process.env.MONGO_URI;

export default async function handler(req, res) {
  try {
    // Connect to MongoDB only if not connected already
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
    }

    if (req.method === 'GET') {
      const bookings = await Booking.find();
      return res.status(200).json(bookings);
    }

    if (req.method === 'POST') {
      const newBooking = await Booking.create(req.body);
      return res.status(201).json(newBooking);
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (err) {
    console.error('❌ Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
