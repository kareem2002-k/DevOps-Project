import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StartConversationButton from './StartConversationButton';
import { userState } from '../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { PlusIcon } from '@heroicons/react/20/solid';
const Home: React.FC = () => {
  const [friends, setFriends] = useState<{ username: string }[]>([]);
  const [friendRequest, setFriendRequest] = useState('');
  const userId = useRecoilValue(userState); // Use Recoil to get the user ID

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = userId.token;
        const response = await axios.get('http://localhost:5001/api/friends/get-friends', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [userId.token]); // Add userId.token as a dependency

  const handleFriendRequest = async () => {
    try {
      const token = userId.token;
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Home</h2>

        {/* Friend Request Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Send Friend Request</h3>
          <div className="flex items-center border rounded-md shadow-sm">
            <input
              type="text"
              placeholder="Friend's Username"
              value={friendRequest}
              onChange={(e) => setFriendRequest(e.target.value)}
              className="flex-grow p-3 border-r border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleFriendRequest}
              className="bg-blue-500 text-white p-3 rounded-r-md hover:bg-blue-600 flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" /> {/* Add icon */}
              Send
            </button>
          </div>
        </div>

        {/* Friend List Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Friends</h3>
          <ul className="space-y-4">
            {friends.map((friend, index) => (
              <li key={index} className="flex justify-between items-center p-4 border-b border-gray-200">
                <span className="text-gray-800 font-medium">{friend.username}</span>
                <StartConversationButton friendUsername={friend.username} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
