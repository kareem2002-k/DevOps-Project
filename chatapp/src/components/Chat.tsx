import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userIdState } from '../atoms/userAtom';

const socket = io('http://localhost:5001');

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: { username: string }; message: string; timestamp: string }[]>([]);
  const { conversationId } = useParams();
  const userId = useRecoilValue(userIdState); // Use Recoil to get the user ID

  useEffect(() => {
    if (conversationId) {
      socket.emit('joinConversation', conversationId);

      socket.on('receiveMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [conversationId]);

  const sendMessage = () => {
    if (conversationId && userId) {
      socket.emit('sendMessage', { conversationId, message, senderId: userId });
      setMessage('');
    }
  };

  return (
    <div className="p-4">
      <div className="border p-2 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender._id === userId ? 'sent' : 'received'}`}>
            <div className="sender">{msg.sender.username}</div>
            <div className="message-text">{msg.message}</div>
            <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
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
