const express = require('express');
const app = express();
const connectDB = require('./database/connect');
const tasks = require('./routes/tasks');
const cors = require('cors');
require('dotenv').config();

// CORS Setup
const allowedOrigins = [
  'https://fitnestbackend-ojcw.onrender.com',
  'https://fitnest-eta.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and authorization headers
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/users', tasks);

// Start server
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

console.log("Hello! Welcome to Node Backend");