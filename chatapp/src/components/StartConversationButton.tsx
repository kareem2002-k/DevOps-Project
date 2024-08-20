import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StartConversationButton: React.FC<{ friendUsername: string }> = ({ friendUsername }) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const startConversation = async () => {
    try {
      // Make a POST request to start a conversation
      const response = await axios.post(
        'http://localhost:5001/api/conversations/start-conversation',
        { friendUsername },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token storage mechanism
          },
        }
      );

        // Extract the conversation ID from the response
        console.log(response.data);
        const conversationId = response.data._id;


      // Navigate to the chat page
      navigate(`/chat/${conversationId}`);
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError('Failed to start conversation. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={startConversation}>Start Conversation</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default StartConversationButton;
