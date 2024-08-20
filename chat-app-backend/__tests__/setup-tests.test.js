const axios = require('axios');

describe('API Endpoints', () => {
  const baseURL = 'http://localhost:5001';

  test('GET / should return welcome message', async () => {
    try {
      const response = await axios.get(`${baseURL}/`);
      expect(response.status).toBe(200);
      expect(response.data).toEqual({ message: 'Welcome to Chat App API' });
    } catch (error) {
      console.error('Error response:', error.response ? error.response.data : error.message);
      throw error;
    }
  });

  test('POST /api/users/register should register a new user', async () => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/register`, {
        username: 'testuser',
        password: 'testpassword',
      });
      expect(response.status).toBe(201);
      expect(response.data.message).toBe('User registered successfully');

      
    } catch (error) {
      console.error('Error response:', error.response ? error.response.data : error.message);
      throw error;
    }
  });

  test ('POST create the user Friend', async () => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/register`, {
        username: 'anotheruser',
        password : 'another'
      });
      expect(response.status).toBe(201);
      expect(response.data.message).toBe('User registered successfully');
    } catch (error) {
      console.error('Error response:', error.response ? error.response.data : error.message);
      throw error;
    }
  });


  test('POST /api/users/login should log in a user with correct credentials', async () => {
    try {
      const response = await axios.post(`${baseURL}/api/auth/login`, {
        username: 'testuser',
        password: 'testpassword',
      });
      expect(response.status).toBe(200);
      expect(response.data.accessToken).toBeDefined();
    } catch (error) {
      console.error('Error response:', error.response ? error.response.data : error.message);
      throw error;
    }
  });

  test('POST /api/friends/add-friend should add a friend', async () => {
    try {
      const loginResponse = await axios.post(`${baseURL}/api/auth/login`, {
        username: 'testuser',
        password: 'testpassword',
      });
      const token = loginResponse.data.accessToken;

      const response = await axios.post(`${baseURL}/api/friends/add-friend`, {
        friendUsername: 'anotheruser',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(response.status).toBe(200);
      expect(response.data).toBe('Friend added');
    } catch (error) {
      console.error('Error response:', error.response ? error.response.data : error.message);
      throw error;
    }
  });

  test('POST /api/conversations/start-conversation should start a new conversation', async () => {
    try {
      const loginResponse = await axios.post(`${baseURL}/api/auth/login`, {
        username: 'testuser',
        password: 'testpassword',
      });
      const token = loginResponse.data.accessToken;

      const response = await axios.post(`${baseURL}/api/conversations/start-conversation`, {
        friendUsername: 'anotheruser',
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('participants');
      expect(response.data).toHaveProperty('messages');
    } catch (error) {
      console.error('Error response:', error.response ? error.response.data : error.message);
      throw error;
    }
  });
});
