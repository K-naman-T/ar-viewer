import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(credentials.email, credentials.password);
      setShowLogin(false);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="mt-4">
        <span className="text-gray-700 mr-2">Welcome, {user.username}</span>
        <button
          onClick={logout}
          className="bg-gradient-to-r from-violet-500 to-orange-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {!showLogin ? (
        <button
          onClick={() => setShowLogin(true)}
          className="bg-gradient-to-r from-violet-500 to-orange-500 text-white px-4 py-2 rounded"
        >
          Admin Login
        </button>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
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
                value={credentials.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-violet-500 to-orange-500 text-white rounded"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;