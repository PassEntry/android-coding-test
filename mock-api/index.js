const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mock user data for authentication
const validCredentials = {
  username: 'hello@passentry.com',
  password: 'securepass',
};

// Mock data for /taps endpoint
const generateMockTapsData = () => {
  const tapsData = [];
  const readerId = 'reader-0001';

  for (let i = 0; i < 30; i++) {
    const tappedAt = new Date();
    const status = Math.random() < 0.8 ? 'success' : 'fail'; // 80% success rate

    tapsData.push({ tappedAt, status, readerId });
  }

  return tapsData;
};

// Mock authentication middleware
const authenticate = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken || bearerToken !== 'Bearer secure-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

// POST /login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  let responseCode, responseBody;
  if (username === validCredentials.username && password === validCredentials.password) {
    responseCode = 200;
    responseBody = { 'api-token': 'secure-token' };
  } else {
    responseCode = 401;
    responseBody = { error: 'Unauthorized' };
  }

  setTimeout(() => {
    res.status(responseCode).json(responseBody);
  }, delay);
});

// GET /taps endpoint
app.get('/taps', authenticate, (req, res) => {
  const tapsData = generateMockTapsData();

  // Introduce a random delay between 1 and 3 seconds (1000 to 3000 milliseconds)
  const delay = Math.floor(Math.random() * 2000) + 1000;

  setTimeout(() => {
    res.status(200).json(tapsData);
  }, delay);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Mock server is running on http://localhost:${PORT}`);
});