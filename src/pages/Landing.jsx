import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const [name, setName] = useState('');
  const [npstId, setNpstId] = useState('');
  const navigate = useNavigate();

  const handleProceed = () => {
    if (name && npstId) {
      localStorage.setItem('user_name', name);
      localStorage.setItem('npst_id', npstId);
      navigate('/booking');
    }
  };

  const isFormValid = name.trim() !== '' && npstId.trim() !== '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f0f9fb] to-[#dff3f8] p-4">
      <div className="bg-white rounded-2xl p-10 shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-[#0E1E2B] mb-1">
          Welcome to NPST Portal
        </h1>
        <p className="text-sm text-[#00B5D9] mb-6 italic">
          Innovation in every byte
        </p>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5D9]"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="NPST ID"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5D9]"
          value={npstId}
          onChange={e => setNpstId(e.target.value)}
        />

        <button
          onClick={handleProceed}
          disabled={!isFormValid}
          className={`w-full font-semibold py-3 rounded-lg transition ${
            isFormValid
              ? 'bg-[#00B5D9] text-white hover:bg-[#00A2C4]'
              : 'bg-[#00B5D9] opacity-50 cursor-not-allowed text-white'
          }`}
        >
          Way to Booking →
        </button>
      </div>
    </div>
  );
}
