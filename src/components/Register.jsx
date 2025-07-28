// src/components/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [userData, setUserData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(userData.username, userData.email, userData.password);
      setShowRegister(false);
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="mt-4">
      {!showRegister ? (
        <button
          onClick={() => setShowRegister(true)}
          className="bg-gradient-to-r from-violet-500 to-orange-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-4">Create Account</h2>
          
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowRegister(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-violet-500 to-orange-500 text-white rounded"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;