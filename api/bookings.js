import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
let db;

export default async function handler(req, res) {
  try {
    if (!db) {
      await client.connect();
      db = client.db('meetingdb'); // use your DB name
    }

    const bookings = db.collection('bookings');

    if (req.method === 'GET') {
      const all = await bookings.find().toArray();
      return res.status(200).json(all);
    }

    if (req.method === 'POST') {
      const newBooking = req.body;

      if (!newBooking || !newBooking.room) {
        return res.status(400).json({ message: 'Invalid booking data' });
      }

      await bookings.insertOne(newBooking);
      return res.status(201).json({ message: 'Booking added' });
    }

    return res.status(405).json({ message: 'Method not allowed' });

  } catch (err) {
    console.error('❌ API Error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
