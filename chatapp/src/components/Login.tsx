import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.accessToken);
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="p-4">
      <h2>Login</h2>
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
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 m-2">
        Login
      </button>
    </div>
  );
};

export default Login;
