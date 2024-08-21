const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type', 'authorization'],
  }
});

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: ["GET", "POST"],
  allowedHeaders: ['Content-Type', 'authorization'],
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Failed to connect to MongoDB Atlas:', err.message);
});

// Import routes
const authRoutes = require('./routes/auth');
const friendRoutes = require('./routes/friends');
const conversationRoutes = require('./routes/conversations');
const userRoutes = require('./routes/userRoutes');
const Conversation = require('./models/Conversation');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Chat App API' });
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Join private room for conversation
  socket.on('joinConversation', async (conversationId) => {
    console.log(`Client joined conversation: ${conversationId}`);
    socket.join(conversationId);

    try {
      const conversation = await Conversation.findById(conversationId);

      if (conversation) {
        // Send all old messages to the user who just joined
        socket.emit('loadOldMessages', conversation.messages);
      } else {
        socket.emit('error', { message: 'Conversation not found' });
      }
    } catch (error) {
      console.error('Error fetching conversation:', error.message);
      socket.emit('error', { message: 'Failed to load conversation' });
    }
  });

  // Send private message
  socket.on('sendMessage', async (data) => {
    const { conversationId, message, senderId , username } = data;

    try {
      const conversation = await Conversation.findById(conversationId);

      if (!conversation) {
        return socket.emit('error', { message: 'Conversation not found' });
      }

      const newMessage = {
        sender: senderId,
        message: message,
        username: username,

      };

      conversation.messages.push(newMessage);
      await conversation.save();

      io.to(conversationId).emit('receiveMessage', newMessage);
    } catch (error) {
      console.error('Error sending message:', error.message);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export the server
