import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat/:conversationId" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
