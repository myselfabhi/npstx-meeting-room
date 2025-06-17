import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URI);
let db;

export default async function handler(req, res) {
  try {
    if (!db) {
      await client.connect();
      db = client.db('meetingdb'); // or your DB name
    }

    const bookings = db.collection('bookings');

    if (req.method === 'GET') {
      const all = await bookings.find().toArray();
      return res.status(200).json(all);
    }

    if (req.method === 'POST') {
      const newBooking = req.body;
      await bookings.insertOne(newBooking);
      return res.status(201).json(newBooking);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('❌ API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
