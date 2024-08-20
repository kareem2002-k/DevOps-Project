import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:5001');

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const { conversationId } = useParams();

  useEffect(() => {
    socket.emit('joinConversation', conversationId);

    socket.on('receiveMessage', (newMessage: string) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [conversationId]);

  const sendMessage = () => {
    socket.emit('sendMessage', { conversationId, message, senderId: 'userId' });
    setMessage('');
  };

  return (
    <div className="p-4">
      <div className="border p-2 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 m-2"
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white p-2 m-2">
        Send
      </button>
    </div>
  );
};

export default Chat;
