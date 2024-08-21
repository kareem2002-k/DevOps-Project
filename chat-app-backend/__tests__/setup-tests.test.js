const axios = require('axios');

describe('API Endpoints', () => {
  const baseURL = 'http://backend:5001';

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

}
);

