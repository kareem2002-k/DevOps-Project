import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/userAtom';

const socket = io('http://localhost:5001');

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; message: string; username :string }[]>([]);
  const { conversationId } = useParams();
  const userId = useRecoilValue(userState);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (conversationId) {
      socket.emit('joinConversation', conversationId);

      socket.on('receiveMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        scrollToBottom(); // Scroll down on receiving a new message
      });

      socket.on('loadOldMessages', (oldMessages) => {
        setMessages(oldMessages);
        scrollToBottom(); // Scroll down when messages are loaded
      });

      return () => {
        socket.off('receiveMessage');
        socket.off('loadOldMessages');
      };
    }
  }, [conversationId]);

  const sendMessage = () => {
    if (conversationId && userId) {
      socket.emit('sendMessage', { conversationId, message, senderId: userId.userId , username: userId.username });
      setMessage('');
    }
  };

  return (
    <div className="chat-container p-4 flex flex-col bg-gray-100">
      <div className="message-box flex flex-col-reverse border  flex-grow overflow-y-auto bg-white rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message mb-4 p-4 rounded-lg break-words max-w-xs ${
              msg.sender === userId.userId ? 'bg-blue-700 text-white self-end' : 'bg-gray-200 self-start'
            }`}
          >
            <div className="sender font-bold text-sm">{msg.username}</div>
            <div className="message-text">{msg.message}</div>
          </div>
        ))}
              <div ref={messagesEndRef} /> {/* Dummy div to scroll to */}

      </div>
      <div className="input-section flex items-center fixed bottom-0  w-full bg-white p-4 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input border p-2 flex-grow rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="send-button bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 shadow-md"
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default Chat;
