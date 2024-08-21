import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ChartBarSquareIcon } from '@heroicons/react/20/solid';


const StartConversationButton: React.FC<{ friendUsername: string }> = ({ friendUsername }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const startConversation = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5001/api/conversations/start-conversation',
        { friendUsername },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);
      const conversationId = response.data._id;

      navigate(`/chat/${conversationId}`);
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError('Failed to start conversation. Please try again.');
    }
  };

  return (
    <div className="button-container">
      <button className="start-button" onClick={startConversation}>
        <ChartBarSquareIcon className="icon" /> Start Conversation
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default StartConversationButton;
