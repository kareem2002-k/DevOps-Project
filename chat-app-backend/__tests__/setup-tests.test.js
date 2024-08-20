
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index.js'); // Adjust path as needed

const baseUrl = 'http://localhost:5000';

let server;
let authToken;
let userId;
let friendId;
let conversationId;

beforeAll(async () => {
  server = app.listen(5000);
});

afterAll(async () => {
  server.close();
  await mongoose.connection.close();
});

describe('User Authentication', () => {
  it('should register a new user', async () => {
    const response = await request(baseUrl)
      .post('/api/auth/register')
      .send({ username: 'testuser', password: 'testpass' });
    
    expect(response.status).toBe(201);
  });

  it('should log in the user', async () => {
    const response = await request(baseUrl)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'testpass' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
    authToken = response.body.accessToken;
  });
});

describe('User Actions', () => {
  beforeAll(async () => {
    // Create a friend user for testing
    const userResponse = await request(baseUrl)
      .post('/api/auth/register')
      .send({ username: 'testuser2', password: 'testpass2' });

    friendId = userResponse.body._id;

    // Get the logged-in user ID
    const profileResponse = await request(baseUrl)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${authToken}`);
    
    userId = profileResponse.body._id;
  });

  it('should add a friend', async () => {
    const response = await request(baseUrl)
      .post('/api/friends/add-friend')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ friendUsername: 'testuser2' });

    expect(response.status).toBe(200);
  });

  it('should start a conversation', async () => {
    const response = await request(baseUrl)
      .post('/api/conversations/start-conversation')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ friendUsername: 'testuser2' });

    expect(response.status).toBe(200);
    conversationId = response.body._id;
  });
});

// Add further tests as needed for real-time messaging, etc.
