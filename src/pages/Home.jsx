import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    room: '',
    date: '',
    start: '',
    end: '',
    name: '',
    npstId: '',
  });

  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const name = localStorage.getItem('user_name') || 'Unknown';
    const npstId = localStorage.getItem('npst_id') || '';
    setFormData(prev => ({ ...prev, name, npstId }));

    axios.get('/api/bookings')
      .then(res => setBookings(res.data))
      .catch(console.error);
  }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/bookings', formData);
      setBookings(prev => [...prev, res.data]);
      setMessage({ type: 'success', text: '✅ Room booked successfully!' });
      setFormData(prev => ({ ...prev, room: '', date: '', start: '', end: '' }));
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Booking failed';
      setMessage({ type: 'error', text: msg });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f9fb] p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#0E1E2B]">Meeting Room Booking</h2>
          {/* <p className="text-sm text-[#00B5D9] italic">Innovation in every byte</p> */}
        </div>

        <div className="mb-6 text-sm text-right text-gray-500">
          👤 <span className="font-medium">{formData.name}</span> (
          <span className="text-[#00B5D9]">{formData.npstId}</span>)
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Meeting Room</label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B5D9]"
            >
              <option value="">-- Select Room --</option>
              <option value="Accountability">Accountability (8)</option>
              <option value="Collaboration">Collaboration (12)</option>
              <option value="Respect">Respect (6)</option>
              <option value="Care">Care (1)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B5D9]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Start Time</label>
              <input
                type="time"
                name="start"
                value={formData.start}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B5D9]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">End Time</label>
              <input
                type="time"
                name="end"
                value={formData.end}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B5D9]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00B5D9] text-white font-semibold py-3 rounded-lg hover:bg-[#00A0C0] transition"
          >
            Book Room
          </button>

          {message.text && (
            <div
              className={`text-center font-medium p-3 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}
            >
              {message.text}
            </div>
          )}
        </form>

        <div className="mt-8">
          <h3 className="text-center text-lg font-semibold mb-3 text-[#0E1E2B]">📋 Booked Slots</h3>
          <ul className="space-y-2 text-sm text-gray-800">
            {bookings.map((b, i) => (
              <li
                key={i}
                className="bg-[#f0f9ff] p-3 rounded shadow-sm border border-gray-200"
              >
                📅 {b.date} | ⏰ {b.start}–{b.end} | 🏢 {b.room} | 👤 {b.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
