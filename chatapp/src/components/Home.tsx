import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StartConversationButton from './StartConversationButton';

const Home: React.FC = () => {
  const [friends, setFriends] = useState<{ username: string }[]>([]);
  const [friendRequest, setFriendRequest] = useState('');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5001/api/friends/get-friends', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  const handleFriendRequest = async () => {
    try {
        console.log("friendRequest", friendRequest);
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5001/api/friends/add-friend', {
        friendUsername: friendRequest,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriendRequest('');
      // Optionally refresh the friend list
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };


  return (
    <div className="p-4">
      <h2>Home</h2>
      <input
        type="text"
        placeholder="Friend's Username"
        value={friendRequest}
        onChange={(e) => setFriendRequest(e.target.value)}
        className="border p-2 m-2"
      />
      <button onClick={handleFriendRequest} className="bg-blue-500 text-white p-2 m-2">
        Send Friend Request
      </button>
      <h3>Available Friends</h3>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>
            {friend.username}
            <StartConversationButton friendUsername={friend.username} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
