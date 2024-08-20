import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5001/api/users/register', {
        username,
        password,
      });
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 m-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 m-2"
      />
      <button onClick={handleRegister} className="bg-blue-500 text-white p-2 m-2">
        Register
      </button>
    </div>
  );
};

export default Register;
