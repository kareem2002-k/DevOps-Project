const request = require('supertest');
const mongoose = require('mongoose');
const server = require('../index.js'); // Import the server
const User = require('../models/User');
const Conversation = require('../models/Conversation');

// Helper function to create a user and get token
const createUserAndGetToken = async (username, password) => {
  await request(server)
    .post('/api/users/register')
    .send({ username, password });
  
  const response = await request(server)
    .post('/api/users/login')
    .send({ username, password });

  return response.body.accessToken;
};

describe('User Routes', () => {
  let token;

  beforeAll(async () => {
    token = await createUserAndGetToken('testuser', 'testpassword');
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close(); // Close the server
  });

  describe('POST /api/users/register', () => {
    it('should register a new user', async () => {
      const response = await request(server)
        .post('/api/users/register')
        .send({ username: 'newuser', password: 'newpassword' });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
    });

    it('should not register a user with existing username', async () => {
      const response = await request(server)
        .post('/api/users/register')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/users/login', () => {
    it('should log in a user with correct credentials', async () => {
      const response = await request(server)
        .post('/api/users/login')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(response.status).toBe(200);
      expect(response.body.accessToken).toBeDefined();
    });

    it('should not log in with incorrect credentials', async () => {
      const response = await request(server)
        .post('/api/users/login')
        .send({ username: 'testuser', password: 'wrongpassword' });

      expect(response.status).toBe(403);
      expect(response.text).toBe('Invalid Credentials');
    });
  });

  describe('GET /api/users/me', () => {
    it('should get the logged-in user profile', async () => {
      const response = await request(server)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.username).toBe('testuser');
    });

    it('should return 401 if no token is provided', async () => {
      const response = await request(server)
        .get('/api/users/me');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/friends/add-friend', () => {
    it('should add a friend', async () => {
      await request(server)
        .post('/api/users/register')
        .send({ username: 'friend', password: 'password' });

      const response = await request(server)
        .post('/api/friends/add-friend')
        .set('Authorization', `Bearer ${token}`)
        .send({ friendUsername: 'friend' });

      expect(response.status).toBe(200);
      expect(response.text).toBe('Friend added');
    });

    it('should return 404 if the friend user is not found', async () => {
      const response = await request(server)
        .post('/api/friends/add-friend')
        .set('Authorization', `Bearer ${token}`)
        .send({ friendUsername: 'nonexistent' });

      expect(response.status).toBe(404);
      expect(response.text).toBe('User not found');
    });
  });

  describe('POST /api/conversations/start-conversation', () => {
    it('should start a conversation', async () => {
      await request(server)
        .post('/api/users/register')
        .send({ username: 'friend', password: 'password' });

      const response = await request(server)
        .post('/api/conversations/start-conversation')
        .set('Authorization', `Bearer ${token}`)
        .send({ friendUsername: 'friend' });

      expect(response.status).toBe(200);
      expect(response.body.participants).toContainEqual(expect.any(String));
    });

    it('should return 404 if the friend user is not found', async () => {
      const response = await request(server)
        .post('/api/conversations/start-conversation')
        .set('Authorization', `Bearer ${token}`)
        .send({ friendUsername: 'nonexistent' });

      expect(response.status).toBe(404);
      expect(response.text).toBe('User not found');
    });
  });

});
