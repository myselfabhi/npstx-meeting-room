const express = require('express');
const router = express.Router();
const Booking = require ('./lib/Booking');

// GET all bookings
router.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// POST new booking with conflict check
router.post('/', async (req, res) => {
  const { room, date, start, end, name } = req.body;
  const newStart = new Date(`${date}T${start}`);
  const newEnd = new Date(`${date}T${end}`);

  const existing = await Booking.find({ room, date });

  const isConflict = existing.some(b => {
    const bStart = new Date(`${b.date}T${b.start}`);
    const bEnd = new Date(`${b.date}T${b.end}`);
    return newStart < bEnd && newEnd > bStart;
  });

  if (isConflict) {
    return res.status(400).json({ message: 'Slot already booked.' });
  }

  const booking = new Booking({ room, date, start, end, name });
  await booking.save();
  res.status(201).json(booking);
});

module.exports = router;
